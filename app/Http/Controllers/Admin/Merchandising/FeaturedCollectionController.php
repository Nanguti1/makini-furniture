<?php

namespace App\Http\Controllers\Admin\Merchandising;

use App\Actions\Merchandising\FeaturedCollections\FeatureCollection;
use App\Actions\Merchandising\FeaturedCollections\ReorderFeaturedCollections;
use App\Actions\Merchandising\FeaturedCollections\UnfeatureCollection;
use App\Actions\Merchandising\FeaturedCollections\UpdateFeaturedCollection;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Merchandising\StoreFeaturedCollectionRequest;
use App\Http\Requests\Admin\Merchandising\UpdateFeaturedCollectionRequest;
use App\Models\FeaturedCollection;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FeaturedCollectionController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', FeaturedCollection::class);

        return Inertia::render('Admin/FeaturedCollections/Index', [
            'featuredCollections' => FeaturedCollection::query()
                ->with('collection:id,name,slug')
                ->orderBy('sort_order')
                ->orderBy('created_at')
                ->paginate(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', FeaturedCollection::class);

        return Inertia::render('Admin/FeaturedCollections/Create', [
            'collections' => \App\Models\Collection::select(['id', 'name', 'slug'])->get(),
        ]);
    }

    public function store(StoreFeaturedCollectionRequest $request, FeatureCollection $action): RedirectResponse
    {
        $featuredCollection = $action->handle($request->validated());

        return to_route('admin.featured-collections.edit', $featuredCollection)
            ->with('success', 'Collection featured.');
    }

    public function edit(FeaturedCollection $featuredCollection): Response
    {
        $this->authorize('update', $featuredCollection);

        $featuredCollection->load('collection:id,name,slug');

        return Inertia::render('Admin/FeaturedCollections/Edit', [
            'featuredCollection' => $featuredCollection,
            'collections' => \App\Models\Collection::select(['id', 'name', 'slug'])->get(),
        ]);
    }

    public function update(
        UpdateFeaturedCollectionRequest $request,
        FeaturedCollection $featuredCollection,
        UpdateFeaturedCollection $action
    ): RedirectResponse {
        $this->authorize('update', $featuredCollection);
        $action->handle($featuredCollection, $request->validated());

        return back()->with('success', 'Featured collection updated.');
    }

    public function destroy(FeaturedCollection $featuredCollection, UnfeatureCollection $action): RedirectResponse
    {
        $this->authorize('delete', $featuredCollection);
        $action->handle($featuredCollection);

        return to_route('admin.featured-collections.index')
            ->with('success', 'Collection unfeatured.');
    }

    public function reorder(): RedirectResponse
    {
        $this->authorize('update', FeaturedCollection::class);

        $action = app(ReorderFeaturedCollections::class);
        $action->handle($this->validate(request(), [
            'featured_collections' => ['required', 'array'],
            'featured_collections.*' => ['integer'],
        ])['featured_collections']);

        return back()->with('success', 'Featured collections reordered.');
    }
}
