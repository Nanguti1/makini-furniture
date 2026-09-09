<?php

namespace App\Actions\CMS;

use App\Models\Page;
use Illuminate\Support\Facades\DB;

class DeletePage
{
    public function handle(Page $page): void
    {
        DB::transaction(function () use ($page) {
            $page->sections()->delete();
            $page->delete();
        });
    }
}
