<?php

namespace App\Actions\Merchandising\FeaturedProducts;

use App\Models\FeaturedProduct;
use Illuminate\Support\Facades\DB;

class UpdateFeaturedProduct
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function handle(FeaturedProduct $featuredProduct, array $attributes): FeaturedProduct
    {
        return DB::transaction(function () use ($featuredProduct, $attributes) {
            $featuredProduct->update($attributes);
            return $featuredProduct->refresh();
        });
    }
}
