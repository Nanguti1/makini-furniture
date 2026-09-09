<?php

namespace App\Actions\Merchandising\Lookbooks;

use App\Models\Lookbook;
use Illuminate\Support\Facades\DB;

class PublishLookbook
{
    public function handle(Lookbook $lookbook): Lookbook
    {
        return DB::transaction(function () use ($lookbook) {
            $lookbook->update([
                'status' => 'published',
                'published_at' => now(),
            ]);
            return $lookbook->refresh();
        });
    }
}
