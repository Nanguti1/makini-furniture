<?php

namespace App\Actions\Merchandising\FeaturedProducts;

use App\Models\FeaturedProduct;
use Illuminate\Support\Facades\DB;

class FeatureProduct
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function handle(array $attributes): FeaturedProduct
    {
        return DB::transaction(function () use ($attributes) {
            return FeaturedProduct::create($attributes);
        });
    }
}
