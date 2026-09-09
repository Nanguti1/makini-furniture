<?php

namespace App\Queries\Catalog;

use App\Models\Lookbook;
use Illuminate\Database\Eloquent\Collection;

class LookbookQuery
{
    /**
     * @return Collection<int, Lookbook>
     */
    public function getPublished(): Collection
    {
        $now = now();

        return Lookbook::query()
            ->where('status', 'published')
            ->where('published_at', '<=', $now)
            ->with(['items.product:id,name,slug,images'])
            ->orderBy('published_at', 'desc')
            ->get();
    }

    public function findBySlug(string $slug): ?Lookbook
    {
        $now = now();

        return Lookbook::query()
            ->where('slug', $slug)
            ->where('status', 'published')
            ->where('published_at', '<=', $now)
            ->with(['items.product:id,name,slug,images'])
            ->first();
    }
}
