<?php

namespace App\Actions\Reviews;

use App\Models\Review;
use Illuminate\Support\Facades\DB;

class UpdateReview
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function handle(Review $review, array $attributes): Review
    {
        return DB::transaction(function () use ($review, $attributes) {
            // Only allow updates if review is still pending
            if ($review->status->value !== 'pending') {
                abort(403, 'You can only update pending reviews.');
            }

            $review->update($attributes);
            return $review->refresh()->load('product');
        });
    }
}
