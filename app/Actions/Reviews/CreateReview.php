<?php

namespace App\Actions\Reviews;

use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use App\Queries\Account\ReviewQuery;
use Illuminate\Support\Facades\DB;

class CreateReview
{
    public function __construct(private ReviewQuery $reviewQuery) {}

    /**
     * @param array<string, mixed> $attributes
     */
    public function handle(User $user, Product $product, array $attributes): Review
    {
        return DB::transaction(function () use ($user, $product, $attributes) {
            // Check if user is eligible to review
            if (!$this->reviewQuery->canUserReviewProduct($user, $product->id)) {
                abort(403, 'You can only review products you have purchased and received.');
            }

            // Check for duplicate review
            if ($this->reviewQuery->hasUserReviewedProduct($user, $product->id)) {
                abort(409, 'You have already reviewed this product.');
            }

            $review = $user->reviews()->create(array_merge($attributes, [
                'product_id' => $product->id,
                'verified_purchase' => true,
                'status' => 'pending',
            ]));

            return $review->load('product');
        });
    }
}
