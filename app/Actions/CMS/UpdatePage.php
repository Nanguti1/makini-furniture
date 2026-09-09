<?php

namespace App\Actions\CMS;

use App\Models\Page;
use App\Services\Catalog\SlugService;
use Illuminate\Support\Facades\DB;

class UpdatePage
{
    public function __construct(private SlugService $slugs) {}

    /**
     * @param array<string, mixed> $attributes
     */
    public function handle(Page $page, array $attributes): Page
    {
        return DB::transaction(function () use ($page, $attributes) {
            if (array_key_exists('slug', $attributes) && $attributes['slug'] === '') {
                unset($attributes['slug']);
            }

            if (isset($attributes['slug']) && $attributes['slug'] !== $page->slug) {
                $attributes['slug'] = $this->slugs->unique(new Page, $attributes['slug'], 'slug', $page->id);
            }

            $page->update($attributes);
            return $page->refresh();
        });
    }
}
