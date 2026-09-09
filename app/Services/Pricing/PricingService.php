<?php

namespace App\Services\Pricing;

use App\Data\EffectivePrice;
use App\Models\Price;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Support\Carbon;

class PricingService
{
    public function effectivePrice(Product $product, ?ProductVariant $variant = null, ?string $currency = null): ?EffectivePrice
    {
        $currency ??= config('app.currency', 'USD');
        $now = now();
        $base = Price::query()->where('product_id', $product->id)->where('currency', $currency)
            ->where('is_active', true)->where(fn ($query) => $query->whereNull('starts_at')->orWhere('starts_at', '<=', $now))
            ->where(fn ($query) => $query->whereNull('ends_at')->orWhere('ends_at', '>=', $now));
        $price = $variant ? (clone $base)->where('product_variant_id', $variant->id)->orderByRaw("case price_type when 'sale' then 0 when 'promotional' then 1 when 'retail' then 2 else 3 end")->latest('starts_at')->first() : null;
        $price ??= (clone $base)->whereNull('product_variant_id')->orderByRaw("case price_type when 'sale' then 0 when 'promotional' then 1 when 'retail' then 2 else 3 end")->latest('starts_at')->first();
        if (! $price && $variant?->price_override !== null) return new EffectivePrice((string) $variant->price_override, $currency, 'override');
        return $price ? new EffectivePrice((string) $price->amount, $price->currency, $price->price_type, $price) : null;
    }
}
