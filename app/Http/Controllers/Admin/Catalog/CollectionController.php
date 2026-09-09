<?php
namespace App\Http\Controllers\Admin\Catalog;
use App\Actions\Catalog\Collections\{CreateCollection, UpdateCollection, DeleteCollection, RestoreCollection};
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Catalog\{StoreCollectionRequest, UpdateCollectionRequest};
use App\Models\Collection;
use Inertia\{Inertia, Response};
use Illuminate\Http\RedirectResponse;
class CollectionController extends Controller {
 public function index(): Response { $this->authorize('viewAny', Collection::class); return Inertia::render('Admin/Collections/Index',['collections'=>Collection::query()->latest()->paginate()]); }
 public function create(): Response { $this->authorize('create', Collection::class); return Inertia::render('Admin/Collections/Create'); }
 public function store(StoreCollectionRequest $request, CreateCollection $action): RedirectResponse { $collection=$action->handle($request->validated()); return to_route('admin.collections.edit', $collection)->with('success','Collection created.'); }
 public function edit(Collection $collection): Response { $this->authorize('update', $collection); return Inertia::render('Admin/Collections/Edit',['collection'=>$collection]); }
 public function update(UpdateCollectionRequest $request,Collection $collection,UpdateCollection $action): RedirectResponse { $this->authorize('update', $collection); $action->handle($collection,$request->validated()); return back()->with('success','Collection updated.'); }
 public function destroy(Collection $collection,DeleteCollection $action): RedirectResponse { $this->authorize('delete', $collection); $action->handle($collection); return to_route('admin.collections.index')->with('success','Collection deleted.'); }
 public function restore(int $id,RestoreCollection $action): RedirectResponse { $collection=Collection::withTrashed()->findOrFail($id); $this->authorize('restore',$collection); $action->handle($collection); return back()->with('success','Collection restored.'); }
}
