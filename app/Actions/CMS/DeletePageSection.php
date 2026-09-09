<?php

namespace App\Actions\CMS;

use App\Models\PageSection;
use Illuminate\Support\Facades\DB;

class DeletePageSection
{
    public function handle(PageSection $section): void
    {
        DB::transaction(function () use ($section) {
            $section->delete();
        });
    }
}
