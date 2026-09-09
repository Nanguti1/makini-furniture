<?php

namespace App\Actions\CMS;

use App\Models\FAQ;
use Illuminate\Support\Facades\DB;

class UpdateFAQ
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function handle(FAQ $faq, array $attributes): FAQ
    {
        return DB::transaction(function () use ($faq, $attributes) {
            $faq->update($attributes);
            return $faq->refresh();
        });
    }
}
