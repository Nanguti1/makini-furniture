<?php

namespace App\Actions\Merchandising\Lookbooks;

use App\Models\LookbookItem;
use Illuminate\Support\Facades\DB;

class UpdateLookbookItem
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function handle(LookbookItem $item, array $attributes): LookbookItem
    {
        return DB::transaction(function () use ($item, $attributes) {
            $item->update($attributes);
            return $item->refresh();
        });
    }
}
