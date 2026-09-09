<?php

namespace App\Actions\Merchandising\FeaturedCollections;

use App\Models\FeaturedCollection;
use Illuminate\Support\Facades\DB;

class FeatureCollection
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function handle(array $attributes): FeaturedCollection
    {
        return DB::transaction(function () use ($attributes) {
            return FeaturedCollection::create($attributes);
        });
    }
}
