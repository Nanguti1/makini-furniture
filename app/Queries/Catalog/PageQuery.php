<?php

namespace App\Queries\Catalog;

use App\Models\Page;

class PageQuery
{
    public function findBySlug(string $slug): ?Page
    {
        $now = now();

        return Page::query()
            ->where('slug', $slug)
            ->where('status', 'published')
            ->where('published_at', '<=', $now)
            ->with(['sections'])
            ->first();
    }
}
