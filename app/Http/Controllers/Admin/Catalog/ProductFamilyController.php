<?php
namespace App\Http\Controllers\Admin\Catalog;
use App\Actions\Catalog\ProductFamilies\{CreateProductFamily, UpdateProductFamily, DeleteProductFamily, RestoreProductFamily};
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Catalog\{StoreProductFamilyRequest, UpdateProductFamilyRequest};
use App\Models\{ProductFamily, Brand, Collection};
use Inertia\{Inertia, Response};
use Illuminate\Http\RedirectResponse;
class ProductFamilyController extends Controller {
 public function index(): Response { $this->authorize('viewAny', ProductFamily::class); $query=ProductFamily::query()->with('brand:id,name','collection:id,name')->latest(); if(request()->has('search')){ $query->where('name','like','%'.request('search').'%')->orWhere('slug','like','%'.request('search').'%'); } if(request()->has('status')){ if(request('status')==='active'){ $query->where('is_active',true); }elseif(request('status')==='inactive'){ $query->where('is_active',false); }elseif(request('status')==='trashed'){ $query->onlyTrashed(); } } return Inertia::render('Admin/ProductFamilies/Index',['productFamilies'=>$query->paginate(),'filters'=>request()->only(['search','status'])]); }
 public function create(): Response { $this->authorize('create', ProductFamily::class); return Inertia::render('Admin/ProductFamilies/Create',['brands'=>Brand::all(['id','name']),'collections'=>Collection::all(['id','name'])]); }
 public function store(StoreProductFamilyRequest $request, CreateProductFamily $action): RedirectResponse { $productFamily=$action->handle($request->validated()); return to_route('admin.product-families.edit', $productFamily)->with('success','ProductFamily created.'); }
 public function edit(ProductFamily $productFamily): Response { $this->authorize('update', $productFamily); return Inertia::render('Admin/ProductFamilies/Edit',['productFamily'=>$productFamily,'brands'=>Brand::all(['id','name']),'collections'=>Collection::all(['id','name'])]); }
 public function update(UpdateProductFamilyRequest $request,ProductFamily $productFamily,UpdateProductFamily $action): RedirectResponse { $this->authorize('update', $productFamily); $action->handle($productFamily,$request->validated()); return back()->with('success','ProductFamily updated.'); }
 public function destroy(ProductFamily $productFamily,DeleteProductFamily $action): RedirectResponse { $this->authorize('delete', $productFamily); $action->handle($productFamily); return to_route('admin.product-families.index')->with('success','ProductFamily deleted.'); }
 public function restore(int $id,RestoreProductFamily $action): RedirectResponse { $productFamily=ProductFamily::withTrashed()->findOrFail($id); $this->authorize('restore',$productFamily); $action->handle($productFamily); return back()->with('success','ProductFamily restored.'); }
}
