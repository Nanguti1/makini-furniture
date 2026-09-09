<?php

namespace App\Actions\Merchandising\Lookbooks;

use App\Models\LookbookItem;
use Illuminate\Support\Facades\DB;

class CreateLookbookItem
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function handle(array $attributes): LookbookItem
    {
        return DB::transaction(function () use ($attributes) {
            return LookbookItem::create($attributes);
        });
    }
}
