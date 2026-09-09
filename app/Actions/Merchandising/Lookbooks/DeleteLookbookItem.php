<?php

namespace App\Actions\Merchandising\Lookbooks;

use App\Models\LookbookItem;
use Illuminate\Support\Facades\DB;

class DeleteLookbookItem
{
    public function handle(LookbookItem $item): void
    {
        DB::transaction(function () use ($item) {
            $item->delete();
        });
    }
}
