<?php

namespace App\Actions\Merchandising\FeaturedProducts;

use App\Models\FeaturedProduct;
use Illuminate\Support\Facades\DB;

class ReorderFeaturedProducts
{
    /**
     * @param array<int, int> $featuredProductIds [featured_product_id => sort_order]
     */
    public function handle(array $featuredProductIds): void
    {
        DB::transaction(function () use ($featuredProductIds) {
            foreach ($featuredProductIds as $id => $sortOrder) {
                FeaturedProduct::whereKey($id)->update(['sort_order' => $sortOrder]);
            }
        });
    }
}
