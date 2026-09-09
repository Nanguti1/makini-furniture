<?php

namespace App\Actions\Merchandising\Lookbooks;

use App\Models\Lookbook;
use Illuminate\Support\Facades\DB;

class DeleteLookbook
{
    public function handle(Lookbook $lookbook): void
    {
        DB::transaction(function () use ($lookbook) {
            $lookbook->items()->delete();
            $lookbook->delete();
        });
    }
}
