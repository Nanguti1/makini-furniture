<?php

namespace App\Actions\CMS;

use App\Models\Page;
use Illuminate\Support\Facades\DB;

class UnpublishPage
{
    public function handle(Page $page): Page
    {
        return DB::transaction(function () use ($page) {
            $page->update([
                'status' => 'draft',
                'published_at' => null,
            ]);
            return $page->refresh();
        });
    }
}
