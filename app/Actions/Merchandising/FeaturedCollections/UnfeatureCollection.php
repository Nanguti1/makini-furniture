<?php

namespace App\Actions\Merchandising\FeaturedCollections;

use App\Models\FeaturedCollection;
use Illuminate\Support\Facades\DB;

class UnfeatureCollection
{
    public function handle(FeaturedCollection $featuredCollection): void
    {
        DB::transaction(function () use ($featuredCollection) {
            $featuredCollection->delete();
        });
    }
}
