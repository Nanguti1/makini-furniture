<?php

namespace App\Actions\Merchandising\Lookbooks;

use App\Actions\Catalog\CreatesCatalogRecord;
use App\Models\Lookbook;
use Illuminate\Support\Facades\DB;

class CreateLookbook
{
    use CreatesCatalogRecord;

    /**
     * @param array<string, mixed> $attributes
     */
    public function handle(array $attributes): Lookbook
    {
        return DB::transaction(function () use ($attributes) {
            if (empty($attributes['slug']) && isset($attributes['title'])) {
                $attributes['slug'] = $this->slugs->unique(new Lookbook, $attributes['title']);
            }

            return Lookbook::create($attributes);
        });
    }
}
