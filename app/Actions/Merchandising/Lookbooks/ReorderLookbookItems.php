<?php

namespace App\Actions\Merchandising\Lookbooks;

use App\Models\LookbookItem;
use Illuminate\Support\Facades\DB;

class ReorderLookbookItems
{
    /**
     * @param array<int, int> $itemIds [item_id => sort_order]
     */
    public function handle(array $itemIds): void
    {
        DB::transaction(function () use ($itemIds) {
            foreach ($itemIds as $id => $sortOrder) {
                LookbookItem::whereKey($id)->update(['sort_order' => $sortOrder]);
            }
        });
    }
}
