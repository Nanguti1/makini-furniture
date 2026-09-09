<?php

namespace App\Actions\CMS;

use App\Models\FAQ;
use Illuminate\Support\Facades\DB;

class DeactivateFAQ
{
    public function handle(FAQ $faq): FAQ
    {
        return DB::transaction(function () use ($faq) {
            $faq->update(['is_active' => false]);
            return $faq->refresh();
        });
    }
}
