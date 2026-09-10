<?php
namespace App\Http\Controllers\Admin\Catalog;
use App\Actions\Catalog\Collections\{CreateCollection, UpdateCollection, DeleteCollection, RestoreCollection};
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Catalog\{StoreCollectionRequest, UpdateCollectionRequest};
use App\Models\{Collection, Brand};
use Inertia\{Inertia, Response};
use Illuminate\Http\RedirectResponse;
class CollectionController extends Controller {
 public function index(): Response { $this->authorize('viewAny', Collection::class); $query=Collection::query()->with('brand:id,name')->latest(); if(request()->has('search')){ $query->where('name','like','%'.request('search').'%')->orWhere('slug','like','%'.request('search').'%'); } if(request()->has('status')){ if(request('status')==='active'){ $query->where('is_active',true); }elseif(request('status')==='inactive'){ $query->where('is_active',false); }elseif(request('status')==='trashed'){ $query->onlyTrashed(); } } return Inertia::render('Admin/Collections/Index',['collections'=>$query->paginate(),'filters'=>request()->only(['search','status'])]); }
 public function create(): Response { $this->authorize('create', Collection::class); return Inertia::render('Admin/Collections/Create',['brands'=>Brand::all(['id','name'])]); }
 public function store(StoreCollectionRequest $request, CreateCollection $action): RedirectResponse { $collection=$action->handle($request->validated()); return to_route('admin.collections.edit', $collection)->with('success','Collection created.'); }
 public function edit(Collection $collection): Response { $this->authorize('update', $collection); return Inertia::render('Admin/Collections/Edit',['collection'=>$collection,'brands'=>Brand::all(['id','name'])]); }
 public function update(UpdateCollectionRequest $request,Collection $collection,UpdateCollection $action): RedirectResponse { $this->authorize('update', $collection); $action->handle($collection,$request->validated()); return back()->with('success','Collection updated.'); }
 public function destroy(Collection $collection,DeleteCollection $action): RedirectResponse { $this->authorize('delete', $collection); $action->handle($collection); return to_route('admin.collections.index')->with('success','Collection deleted.'); }
 public function restore(int $id,RestoreCollection $action): RedirectResponse { $collection=Collection::withTrashed()->findOrFail($id); $this->authorize('restore',$collection); $action->handle($collection); return back()->with('success','Collection restored.'); }
}
