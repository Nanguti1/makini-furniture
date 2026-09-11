<?php
namespace App\Http\Controllers\Storefront;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\Pricing\PricingService;
use App\Queries\Account\ReviewQuery;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function show(Product $product, PricingService $pricing, ReviewQuery $reviewQuery): Response
    {
        abort_unless($product->status->value === 'active' && $product->is_active, 404);

        $product->load([
            'brand',
            'category',
            'collection',
            'productFamily',
            'variants.optionValues.option',
            'variants.images',
            'variants.inventories',
            'images',
            'videos',
            'documents',
            'dimensions',
            'materials',
            'finishes',
            'colors',
            'tags',
            'features',
            'rooms',
            'relatedProducts.images',
            'reviews' => fn($q) => $q->where('status', 'approved')->with('user:id,name')->select('id', 'product_id', 'user_id', 'rating', 'title', 'body', 'comment', 'status', 'verified_purchase', 'created_at')
        ]);

        $userReview = null;
        $canReview = false;

        if (auth()->check()) {
            $user = auth()->user();
            $userReview = $reviewQuery->findForUser($user, $product->id);
            $canReview = $reviewQuery->canUserReviewProduct($user, $product->id);
        }

        $cart = app(\App\Actions\Cart\GetCurrentCart::class)->handle(
            auth()->user(),
            request()->session()->getId()
        );

        return Inertia::render('Products/Show', [
            'product' => $product,
            'effectivePrices' => $product->variants->mapWithKeys(fn($variant) => [$variant->id => $pricing->effectivePrice($product, $variant)]),
            'productPrice' => $pricing->effectivePrice($product),
            'userReview' => $userReview,
            'canReview' => $canReview,
            'cart' => $cart,
        ]);
    }
}
