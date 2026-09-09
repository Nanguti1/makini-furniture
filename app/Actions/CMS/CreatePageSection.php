<?php

namespace App\Actions\CMS;

use App\Models\PageSection;
use Illuminate\Support\Facades\DB;

class CreatePageSection
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function handle(array $attributes): PageSection
    {
        return DB::transaction(function () use ($attributes) {
            return PageSection::create($attributes);
        });
    }
}
