<?php

namespace App\Actions\Merchandising\Lookbooks;

use App\Models\Lookbook;
use App\Services\Catalog\SlugService;
use Illuminate\Support\Facades\DB;

class UpdateLookbook
{
    public function __construct(private SlugService $slugs) {}

    /**
     * @param array<string, mixed> $attributes
     */
    public function handle(Lookbook $lookbook, array $attributes): Lookbook
    {
        return DB::transaction(function () use ($lookbook, $attributes) {
            if (array_key_exists('slug', $attributes) && $attributes['slug'] === '') {
                unset($attributes['slug']);
            }

            if (isset($attributes['slug']) && $attributes['slug'] !== $lookbook->slug) {
                $attributes['slug'] = $this->slugs->unique(new Lookbook, $attributes['slug'], 'slug', $lookbook->id);
            }

            $lookbook->update($attributes);
            return $lookbook->refresh();
        });
    }
}
