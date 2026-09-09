<?php

namespace App\Actions\Merchandising\FeaturedCollections;

use App\Models\FeaturedCollection;
use Illuminate\Support\Facades\DB;

class UpdateFeaturedCollection
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function handle(FeaturedCollection $featuredCollection, array $attributes): FeaturedCollection
    {
        return DB::transaction(function () use ($featuredCollection, $attributes) {
            $featuredCollection->update($attributes);
            return $featuredCollection->refresh();
        });
    }
}
