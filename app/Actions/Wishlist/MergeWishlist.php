<?php

namespace App\Actions\Wishlist;

use App\Models\Wishlist;
use Illuminate\Support\Facades\DB;

class MergeWishlist
{
    public function handle(Wishlist $source, Wishlist $target): Wishlist
    {
        return DB::transaction(function () use ($source, $target) {
            foreach ($source->items as $item) {
                $target->items()->firstOrCreate([
                    'product_id' => $item->product_id,
                    'product_variant_id' => $item->product_variant_id,
                ]);
            }

            $source->items()->delete();
            $source->delete();

            return $target->load('items');
        });
    }
}
