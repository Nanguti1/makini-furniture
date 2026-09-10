<?php
namespace App\Http\Controllers\Admin\Catalog;
use App\Actions\Catalog\Brands\{CreateBrand, UpdateBrand, DeleteBrand, RestoreBrand};
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Catalog\{StoreBrandRequest, UpdateBrandRequest};
use App\Models\Brand;
use Inertia\{Inertia, Response};
use Illuminate\Http\RedirectResponse;
class BrandController extends Controller {
 public function index(): Response { $this->authorize('viewAny', Brand::class); $query=Brand::query()->latest(); if(request()->has('search')){ $query->where('name','like','%'.request('search').'%')->orWhere('slug','like','%'.request('search').'%'); } if(request()->has('status')){ if(request('status')==='active'){ $query->where('is_active',true); }elseif(request('status')==='inactive'){ $query->where('is_active',false); }elseif(request('status')==='trashed'){ $query->onlyTrashed(); } } return Inertia::render('Admin/Brands/Index',['brands'=>$query->paginate(),'filters'=>request()->only(['search','status'])]); }
 public function create(): Response { $this->authorize('create', Brand::class); return Inertia::render('Admin/Brands/Create'); }
 public function store(StoreBrandRequest $request, CreateBrand $action): RedirectResponse { $brand=$action->handle($request->validated()); return to_route('admin.brands.edit', $brand)->with('success','Brand created.'); }
 public function edit(Brand $brand): Response { $this->authorize('update', $brand); return Inertia::render('Admin/Brands/Edit',['brand'=>$brand]); }
 public function update(UpdateBrandRequest $request,Brand $brand,UpdateBrand $action): RedirectResponse { $this->authorize('update', $brand); $action->handle($brand,$request->validated()); return back()->with('success','Brand updated.'); }
 public function destroy(Brand $brand,DeleteBrand $action): RedirectResponse { $this->authorize('delete', $brand); $action->handle($brand); return to_route('admin.brands.index')->with('success','Brand deleted.'); }
 public function restore(int $id,RestoreBrand $action): RedirectResponse { $brand=Brand::withTrashed()->findOrFail($id); $this->authorize('restore',$brand); $action->handle($brand); return back()->with('success','Brand restored.'); }
}
