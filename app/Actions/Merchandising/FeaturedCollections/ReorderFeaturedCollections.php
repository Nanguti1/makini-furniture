<?php

namespace App\Actions\Merchandising\FeaturedCollections;

use App\Models\FeaturedCollection;
use Illuminate\Support\Facades\DB;

class ReorderFeaturedCollections
{
    /**
     * @param array<int, int> $featuredCollectionIds [featured_collection_id => sort_order]
     */
    public function handle(array $featuredCollectionIds): void
    {
        DB::transaction(function () use ($featuredCollectionIds) {
            foreach ($featuredCollectionIds as $id => $sortOrder) {
                FeaturedCollection::whereKey($id)->update(['sort_order' => $sortOrder]);
            }
        });
    }
}
