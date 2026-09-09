<?php

namespace App\Http\Controllers\Account;

use App\Actions\Reviews\CreateReview;
use App\Actions\Reviews\DeleteReview;
use App\Actions\Reviews\UpdateReview;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\StoreReviewRequest;
use App\Http\Requests\Account\UpdateReviewRequest;
use App\Models\Product;
use App\Models\Review;
use App\Queries\Account\ReviewQuery;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    public function index(ReviewQuery $query): Response
    {
        $this->authorize('viewAny', Review::class);

        return Inertia::render('Account/Reviews/Index', [
            'reviews' => $query->forUser(auth()->user()),
            'eligibleProducts' => $query->getEligibleProducts(auth()->user()),
        ]);
    }

    public function store(StoreReviewRequest $request, Product $product, CreateReview $action): RedirectResponse
    {
        $review = $action->handle(auth()->user(), $product, $request->validated());

        return back()->with('success', 'Review submitted for approval.');
    }

    public function update(UpdateReviewRequest $request, Review $review, UpdateReview $action): RedirectResponse
    {
        $this->authorize('update', $review);
        $action->handle($review, $request->validated());

        return back()->with('success', 'Review updated.');
    }

    public function destroy(Review $review, DeleteReview $action): RedirectResponse
    {
        $this->authorize('delete', $review);
        $action->handle($review);

        return back()->with('success', 'Review deleted.');
    }
}
