<?php

namespace App\Actions\Merchandising\Lookbooks;

use App\Models\Lookbook;
use Illuminate\Support\Facades\DB;

class UnpublishLookbook
{
    public function handle(Lookbook $lookbook): Lookbook
    {
        return DB::transaction(function () use ($lookbook) {
            $lookbook->update([
                'status' => 'draft',
                'published_at' => null,
            ]);
            return $lookbook->refresh();
        });
    }
}
