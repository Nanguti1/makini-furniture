<?php

namespace App\Actions\CMS;

use App\Actions\Catalog\CreatesCatalogRecord;
use App\Models\Page;
use Illuminate\Support\Facades\DB;

class CreatePage
{
    use CreatesCatalogRecord;

    /**
     * @param array<string, mixed> $attributes
     */
    public function handle(array $attributes): Page
    {
        return DB::transaction(function () use ($attributes) {
            if (empty($attributes['slug']) && isset($attributes['title'])) {
                $attributes['slug'] = $this->slugs->unique(new Page, $attributes['title']);
            }

            return Page::create($attributes);
        });
    }
}
