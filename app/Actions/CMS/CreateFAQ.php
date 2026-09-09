<?php

namespace App\Actions\CMS;

use App\Models\FAQ;
use Illuminate\Support\Facades\DB;

class CreateFAQ
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function handle(array $attributes): FAQ
    {
        return DB::transaction(function () use ($attributes) {
            return FAQ::create($attributes);
        });
    }
}
