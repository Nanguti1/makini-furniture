<?php

namespace App\Queries\Account;

use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class ReviewQuery
{
    /**
     * @return Collection<int, Review>
     */
    public function forUser(User $user): Collection
    {
        return Review::query()
            ->where('user_id', $user->id)
            ->with(['product:id,name,slug', 'product.images' => fn($q) => $q->where('is_primary', true)->select('id', 'product_id', 'url')])
            ->select('id', 'user_id', 'product_id', 'rating', 'title', 'body', 'comment', 'status', 'verified_purchase', 'created_at')
            ->latest('created_at')
            ->get();
    }

    public function findForUser(User $user, int $reviewId): ?Review
    {
        return Review::query()
            ->where('user_id', $user->id)
            ->where('id', $reviewId)
            ->with('product')
            ->select('id', 'user_id', 'product_id', 'rating', 'title', 'body', 'comment', 'status', 'verified_purchase', 'created_at')
            ->first();
    }

    /**
     * Check if user can review a product (has purchased and completed order)
     */
    public function canUserReviewProduct(User $user, int $productId): bool
    {
        return \App\Models\Order::query()
            ->where('user_id', $user->id)
            ->where('status', 'completed')
            ->whereHas('items', fn($q) => $q->where('product_id', $productId))
            ->exists();
    }

    /**
     * Check if user has already reviewed a product
     */
    public function hasUserReviewedProduct(User $user, int $productId): bool
    {
        return Review::query()
            ->where('user_id', $user->id)
            ->where('product_id', $productId)
            ->exists();
    }

    /**
     * Get products user can review but hasn't yet
     */
    public function getEligibleProducts(User $user): Collection
    {
        $reviewedProductIds = Review::query()
            ->where('user_id', $user->id)
            ->pluck('product_id')
            ->toArray();

        return \App\Models\Product::query()
            ->whereHas('orderItems', fn($q) => $q
                ->whereHas('order', fn($q) => $q
                    ->where('user_id', $user->id)
                    ->where('status', 'completed')
                )
            )
            ->whereNotIn('id', $reviewedProductIds)
            ->with(['images' => fn($q) => $q->where('is_primary', true)->select('id', 'product_id', 'url')])
            ->select('id', 'name', 'slug')
            ->get();
    }
}
