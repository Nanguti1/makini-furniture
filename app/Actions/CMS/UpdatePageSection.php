<?php

namespace App\Actions\CMS;

use App\Models\PageSection;
use Illuminate\Support\Facades\DB;

class UpdatePageSection
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function handle(PageSection $section, array $attributes): PageSection
    {
        return DB::transaction(function () use ($section, $attributes) {
            $section->update($attributes);
            return $section->refresh();
        });
    }
}
