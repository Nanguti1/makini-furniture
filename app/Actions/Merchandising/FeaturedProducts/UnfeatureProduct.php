<?php

namespace App\Actions\Merchandising\FeaturedProducts;

use App\Models\FeaturedProduct;
use Illuminate\Support\Facades\DB;

class UnfeatureProduct
{
    public function handle(FeaturedProduct $featuredProduct): void
    {
        DB::transaction(function () use ($featuredProduct) {
            $featuredProduct->delete();
        });
    }
}
