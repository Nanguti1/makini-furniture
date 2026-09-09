<?php
namespace App\Actions\Catalog;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Services\Catalog\ProductConfigurationService;
use Illuminate\Support\Facades\DB;
class CreateProductVariant {
 public function __construct(private ProductConfigurationService $configuration) {}
 /** @param array<string,mixed> $attributes @param array<int> $optionValueIds */
 public function handle(Product $product, array $attributes, array $optionValueIds): ProductVariant {
  return DB::transaction(function () use ($product,$attributes,$optionValueIds) { $values=$this->configuration->validate($product,$optionValueIds); if (($attributes['is_default'] ?? false)) $product->variants()->update(['is_default'=>false]); $variant=$product->variants()->create($attributes); $variant->optionValues()->sync($values->modelKeys()); return $variant->load('optionValues.option'); });
 }
}
