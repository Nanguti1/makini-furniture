<?php

namespace App\Http\Controllers\Admin\Merchandising;

use App\Actions\Merchandising\FeaturedProducts\FeatureProduct;
use App\Actions\Merchandising\FeaturedProducts\ReorderFeaturedProducts;
use App\Actions\Merchandising\FeaturedProducts\UnfeatureProduct;
use App\Actions\Merchandising\FeaturedProducts\UpdateFeaturedProduct;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Merchandising\StoreFeaturedProductRequest;
use App\Http\Requests\Admin\Merchandising\UpdateFeaturedProductRequest;
use App\Models\FeaturedProduct;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FeaturedProductController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', FeaturedProduct::class);

        return Inertia::render('Admin/FeaturedProducts/Index', [
            'featuredProducts' => FeaturedProduct::query()
                ->with('product:id,name,slug')
                ->orderBy('sort_order')
                ->orderBy('created_at')
                ->paginate(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', FeaturedProduct::class);

        return Inertia::render('Admin/FeaturedProducts/Create', [
            'products' => \App\Models\Product::where('status', 'active')
                ->select(['id', 'name', 'slug'])
                ->get(),
        ]);
    }

    public function store(StoreFeaturedProductRequest $request, FeatureProduct $action): RedirectResponse
    {
        $featuredProduct = $action->handle($request->validated());

        return to_route('admin.featured-products.edit', $featuredProduct)
            ->with('success', 'Product featured.');
    }

    public function edit(FeaturedProduct $featuredProduct): Response
    {
        $this->authorize('update', $featuredProduct);

        $featuredProduct->load('product:id,name,slug');

        return Inertia::render('Admin/FeaturedProducts/Edit', [
            'featuredProduct' => $featuredProduct,
            'products' => \App\Models\Product::where('status', 'active')
                ->select(['id', 'name', 'slug'])
                ->get(),
        ]);
    }

    public function update(
        UpdateFeaturedProductRequest $request,
        FeaturedProduct $featuredProduct,
        UpdateFeaturedProduct $action
    ): RedirectResponse {
        $this->authorize('update', $featuredProduct);
        $action->handle($featuredProduct, $request->validated());

        return back()->with('success', 'Featured product updated.');
    }

    public function destroy(FeaturedProduct $featuredProduct, UnfeatureProduct $action): RedirectResponse
    {
        $this->authorize('delete', $featuredProduct);
        $action->handle($featuredProduct);

        return to_route('admin.featured-products.index')
            ->with('success', 'Product unfeatured.');
    }

    public function reorder(): RedirectResponse
    {
        $this->authorize('update', FeaturedProduct::class);

        $action = app(ReorderFeaturedProducts::class);
        $action->handle($this->validate(request(), [
            'featured_products' => ['required', 'array'],
            'featured_products.*' => ['integer'],
        ])['featured_products']);

        return back()->with('success', 'Featured products reordered.');
    }
}
