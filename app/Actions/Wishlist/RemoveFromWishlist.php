<?php

namespace App\Actions\Wishlist;

use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Wishlist;
use Illuminate\Support\Facades\DB;

class RemoveFromWishlist
{
    public function handle(Wishlist $wishlist, Product $product, ?ProductVariant $variant = null): void
    {
        DB::transaction(function () use ($wishlist, $product, $variant) {
            $query = $wishlist->items()->where('product_id', $product->id);

            if ($variant) {
                $query->where('product_variant_id', $variant->id);
            } else {
                $query->whereNull('product_variant_id');
            }

            $query->delete();
        });
    }
}
