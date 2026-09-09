<?php

namespace App\Actions\CMS;

use App\Models\PageSection;
use Illuminate\Support\Facades\DB;

class ReorderPageSections
{
    /**
     * @param array<int, int> $sectionIds [section_id => sort_order]
     */
    public function handle(array $sectionIds): void
    {
        DB::transaction(function () use ($sectionIds) {
            foreach ($sectionIds as $id => $sortOrder) {
                PageSection::whereKey($id)->update(['sort_order' => $sortOrder]);
            }
        });
    }
}
