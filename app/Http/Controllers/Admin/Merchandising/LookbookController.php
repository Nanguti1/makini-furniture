<?php

namespace App\Http\Controllers\Admin\Merchandising;

use App\Actions\Merchandising\Lookbooks\CreateLookbook;
use App\Actions\Merchandising\Lookbooks\CreateLookbookItem;
use App\Actions\Merchandising\Lookbooks\DeleteLookbook;
use App\Actions\Merchandising\Lookbooks\DeleteLookbookItem;
use App\Actions\Merchandising\Lookbooks\PublishLookbook;
use App\Actions\Merchandising\Lookbooks\ReorderLookbookItems;
use App\Actions\Merchandising\Lookbooks\UnpublishLookbook;
use App\Actions\Merchandising\Lookbooks\UpdateLookbook;
use App\Actions\Merchandising\Lookbooks\UpdateLookbookItem;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Merchandising\StoreLookbookItemRequest;
use App\Http\Requests\Admin\Merchandising\StoreLookbookRequest;
use App\Http\Requests\Admin\Merchandising\UpdateLookbookItemRequest;
use App\Http\Requests\Admin\Merchandising\UpdateLookbookRequest;
use App\Models\Lookbook;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LookbookController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Lookbook::class);

        return Inertia::render('Admin/Lookbooks/Index', [
            'lookbooks' => Lookbook::query()
                ->withCount('items')
                ->latest()
                ->paginate(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Lookbook::class);

        return Inertia::render('Admin/Lookbooks/Create');
    }

    public function store(StoreLookbookRequest $request, CreateLookbook $action): RedirectResponse
    {
        $lookbook = $action->handle($request->validated());

        return to_route('admin.lookbooks.edit', $lookbook)
            ->with('success', 'Lookbook created.');
    }

    public function edit(Lookbook $lookbook): Response
    {
        $this->authorize('update', $lookbook);

        $lookbook->load(['items.product:id,name,slug']);

        return Inertia::render('Admin/Lookbooks/Edit', [
            'lookbook' => $lookbook,
            'products' => \App\Models\Product::where('status', 'published')
                ->select(['id', 'name', 'slug'])
                ->get(),
        ]);
    }

    public function update(
        UpdateLookbookRequest $request,
        Lookbook $lookbook,
        UpdateLookbook $action
    ): RedirectResponse {
        $this->authorize('update', $lookbook);
        $action->handle($lookbook, $request->validated());

        return back()->with('success', 'Lookbook updated.');
    }

    public function destroy(Lookbook $lookbook, DeleteLookbook $action): RedirectResponse
    {
        $this->authorize('delete', $lookbook);
        $action->handle($lookbook);

        return to_route('admin.lookbooks.index')
            ->with('success', 'Lookbook deleted.');
    }

    public function publish(Lookbook $lookbook, PublishLookbook $action): RedirectResponse
    {
        $this->authorize('update', $lookbook);
        $action->handle($lookbook);

        return back()->with('success', 'Lookbook published.');
    }

    public function unpublish(Lookbook $lookbook, UnpublishLookbook $action): RedirectResponse
    {
        $this->authorize('update', $lookbook);
        $action->handle($lookbook);

        return back()->with('success', 'Lookbook unpublished.');
    }

    public function storeItem(
        StoreLookbookItemRequest $request,
        CreateLookbookItem $action
    ): RedirectResponse {
        $this->authorize('create', \App\Models\LookbookItem::class);
        $action->handle($request->validated());

        return back()->with('success', 'Lookbook item added.');
    }

    public function updateItem(
        UpdateLookbookItemRequest $request,
        int $itemId,
        UpdateLookbookItem $action
    ): RedirectResponse {
        $item = \App\Models\LookbookItem::findOrFail($itemId);
        $this->authorize('update', $item);
        $action->handle($item, $request->validated());

        return back()->with('success', 'Lookbook item updated.');
    }

    public function destroyItem(int $itemId, DeleteLookbookItem $action): RedirectResponse
    {
        $item = \App\Models\LookbookItem::findOrFail($itemId);
        $this->authorize('delete', $item);
        $action->handle($item);

        return back()->with('success', 'Lookbook item removed.');
    }

    public function reorderItems(): RedirectResponse
    {
        $action = app(ReorderLookbookItems::class);
        $action->handle($this->validate(request(), [
            'items' => ['required', 'array'],
            'items.*' => ['integer'],
        ])['items']);

        return back()->with('success', 'Lookbook items reordered.');
    }
}
