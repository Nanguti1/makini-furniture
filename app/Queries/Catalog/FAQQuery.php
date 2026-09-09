<?php

namespace App\Queries\Catalog;

use App\Models\FAQ;
use Illuminate\Database\Eloquent\Collection;

class FAQQuery
{
    /**
     * @return Collection<int, FAQ>
     */
    public function getActive(?string $category = null): Collection
    {
        $query = FAQ::query()
            ->where('is_active', true)
            ->orderBy('sort_order');

        if ($category) {
            $query->where('category', $category);
        }

        return $query->get();
    }

    /**
     * @return Collection<int, string>
     */
    public function getCategories(): Collection
    {
        return FAQ::query()
            ->where('is_active', true)
            ->whereNotNull('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category');
    }
}
