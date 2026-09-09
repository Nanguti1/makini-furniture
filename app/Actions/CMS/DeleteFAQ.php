<?php

namespace App\Actions\CMS;

use App\Models\FAQ;
use Illuminate\Support\Facades\DB;

class DeleteFAQ
{
    public function handle(FAQ $faq): void
    {
        DB::transaction(function () use ($faq) {
            $faq->delete();
        });
    }
}
