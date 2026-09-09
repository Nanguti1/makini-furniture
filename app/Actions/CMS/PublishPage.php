<?php

namespace App\Actions\CMS;

use App\Models\Page;
use Illuminate\Support\Facades\DB;

class PublishPage
{
    public function handle(Page $page): Page
    {
        return DB::transaction(function () use ($page) {
            $page->update([
                'status' => 'published',
                'published_at' => now(),
            ]);
            return $page->refresh();
        });
    }
}
