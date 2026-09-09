<?php
namespace App\Http\Controllers\Admin\Catalog;
use App\Actions\Catalog\ProductFamilies\{CreateProductFamily, UpdateProductFamily, DeleteProductFamily, RestoreProductFamily};
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Catalog\{StoreProductFamilyRequest, UpdateProductFamilyRequest};
use App\Models\ProductFamily;
use Inertia\{Inertia, Response};
use Illuminate\Http\RedirectResponse;
class ProductFamilyController extends Controller {
 public function index(): Response { $this->authorize('viewAny', ProductFamily::class); return Inertia::render('Admin/ProductFamilies/Index',['productFamilies'=>ProductFamily::query()->latest()->paginate()]); }
 public function create(): Response { $this->authorize('create', ProductFamily::class); return Inertia::render('Admin/ProductFamilies/Create'); }
 public function store(StoreProductFamilyRequest $request, CreateProductFamily $action): RedirectResponse { $productFamily=$action->handle($request->validated()); return to_route('admin.product-families.edit', $productFamily)->with('success','ProductFamily created.'); }
 public function edit(ProductFamily $productFamily): Response { $this->authorize('update', $productFamily); return Inertia::render('Admin/ProductFamilies/Edit',['productFamily'=>$productFamily]); }
 public function update(UpdateProductFamilyRequest $request,ProductFamily $productFamily,UpdateProductFamily $action): RedirectResponse { $this->authorize('update', $productFamily); $action->handle($productFamily,$request->validated()); return back()->with('success','ProductFamily updated.'); }
 public function destroy(ProductFamily $productFamily,DeleteProductFamily $action): RedirectResponse { $this->authorize('delete', $productFamily); $action->handle($productFamily); return to_route('admin.product-families.index')->with('success','ProductFamily deleted.'); }
 public function restore(int $id,RestoreProductFamily $action): RedirectResponse { $productFamily=ProductFamily::withTrashed()->findOrFail($id); $this->authorize('restore',$productFamily); $action->handle($productFamily); return back()->with('success','ProductFamily restored.'); }
}
