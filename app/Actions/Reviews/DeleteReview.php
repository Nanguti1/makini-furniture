<?php

namespace App\Actions\Reviews;

use App\Models\Review;
use Illuminate\Support\Facades\DB;

class DeleteReview
{
    public function handle(Review $review): void
    {
        DB::transaction(function () use ($review) {
            // Only allow deletion if review is still pending
            if ($review->status->value !== 'pending') {
                abort(403, 'You can only delete pending reviews.');
            }

            $review->delete();
        });
    }
}
