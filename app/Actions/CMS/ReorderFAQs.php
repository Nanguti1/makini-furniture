<?php

namespace App\Actions\CMS;

use App\Models\FAQ;
use Illuminate\Support\Facades\DB;

class ReorderFAQs
{
    /**
     * @param array<int, int> $faqIds [faq_id => sort_order]
     */
    public function handle(array $faqIds): void
    {
        DB::transaction(function () use ($faqIds) {
            foreach ($faqIds as $id => $sortOrder) {
                FAQ::whereKey($id)->update(['sort_order' => $sortOrder]);
            }
        });
    }
}
