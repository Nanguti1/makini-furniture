<?php

namespace App\Http\Controllers\Account;

use App\Actions\Wishlist\AddToWishlist;
use App\Actions\Wishlist\MergeWishlist;
use App\Actions\Wishlist\RemoveFromWishlist;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Wishlist;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WishlistController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Wishlist::class);

        $wishlist = auth()->user()->wishlists()->with(['items.product', 'items.product.images', 'items.variant'])->first();

        if (!$wishlist) {
            $wishlist = auth()->user()->wishlists()->create(['name' => 'My Wishlist']);
        }

        $cart = app(\App\Actions\Cart\GetCurrentCart::class)->handle(
            auth()->user(),
            request()->session()->getId()
        );

        return Inertia::render('Account/Wishlist/Index', [
            'wishlist' => $wishlist,
            'cart' => $cart,
        ]);
    }

    public function add(Request $request, AddToWishlist $action): RedirectResponse
    {
        $wishlist = auth()->user()->wishlists()->firstOrCreate(['name' => 'My Wishlist']);

        $product = Product::findOrFail($request->input('product_id'));
        $variant = $request->input('variant_id') ? ProductVariant::findOrFail($request->input('variant_id')) : null;

        $action->handle($wishlist, $product, $variant);

        return back()->with('success', 'Added to wishlist.');
    }

    public function remove(Request $request, RemoveFromWishlist $action): RedirectResponse
    {
        $wishlist = auth()->user()->wishlists()->firstOrFail();

        $product = Product::findOrFail($request->input('product_id'));
        $variant = $request->input('variant_id') ? ProductVariant::findOrFail($request->input('variant_id')) : null;

        $action->handle($wishlist, $product, $variant);

        return back()->with('success', 'Removed from wishlist.');
    }

    public function merge(int $sourceId, MergeWishlist $action): RedirectResponse
    {
        $source = auth()->user()->wishlists()->findOrFail($sourceId);
        $target = auth()->user()->wishlists()->where('id', '!=', $sourceId)->firstOrFail();

        $action->handle($source, $target);

        return back()->with('success', 'Wishlists merged.');
    }
}
