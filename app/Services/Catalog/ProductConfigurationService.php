<?php
namespace App\Services\Catalog;
use App\Exceptions\InvalidProductConfigurationException;
use App\Models\OptionValue;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Support\Collection;
class ProductConfigurationService {
    /** @param array<int> $optionValueIds */
    public function validate(Product $product, array $optionValueIds, ?ProductVariant $except = null): Collection {
        $ids = collect($optionValueIds)->map(static fn ($id) => (int) $id);
        if ($ids->isEmpty() || $ids->count() !== $ids->unique()->count()) throw new InvalidProductConfigurationException('Select each option value only once.');
        $values = OptionValue::query()->with('option')->whereIn('id', $ids)->get();
        if ($values->count() !== $ids->count()) throw new InvalidProductConfigurationException('One or more option values do not exist.');
        $productOptions = $product->options()->get()->keyBy('id');
        if ($values->contains(fn (OptionValue $value) => ! $productOptions->has($value->option_id))) throw new InvalidProductConfigurationException('An option value is not available for this product.');
        if ($values->pluck('option_id')->unique()->count() !== $values->count()) throw new InvalidProductConfigurationException('A variant may contain only one value per option.');
        if ($productOptions->where('pivot.is_required', true)->keys()->diff($values->pluck('option_id'))->isNotEmpty()) throw new InvalidProductConfigurationException('All required options must have a selected value.');
        $signature = $values->pluck('id')->sort()->values()->implode(',');
        $duplicate = $product->variants()->when($except, fn ($query) => $query->whereKeyNot($except->id))->with('optionValues:id')->get()->contains(fn (ProductVariant $variant) => $variant->optionValues->pluck('id')->sort()->values()->implode(',') === $signature);
        if ($duplicate) throw new InvalidProductConfigurationException('This product variant configuration already exists.');
        return $values;
    }
}
