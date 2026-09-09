<?php
namespace App\Http\Controllers\Admin\Catalog;
use App\Actions\Catalog\Categories\{CreateCategory, UpdateCategory, DeleteCategory, RestoreCategory};
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Catalog\{StoreCategoryRequest, UpdateCategoryRequest};
use App\Models\Category;
use Inertia\{Inertia, Response};
use Illuminate\Http\RedirectResponse;
class CategoryController extends Controller {
 public function index(): Response { $this->authorize('viewAny', Category::class); return Inertia::render('Admin/Categories/Index',['categories'=>Category::query()->latest()->paginate()]); }
 public function create(): Response { $this->authorize('create', Category::class); return Inertia::render('Admin/Categories/Create'); }
 public function store(StoreCategoryRequest $request, CreateCategory $action): RedirectResponse { $category=$action->handle($request->validated()); return to_route('admin.categories.edit', $category)->with('success','Category created.'); }
 public function edit(Category $category): Response { $this->authorize('update', $category); return Inertia::render('Admin/Categories/Edit',['category'=>$category]); }
 public function update(UpdateCategoryRequest $request,Category $category,UpdateCategory $action): RedirectResponse { $this->authorize('update', $category); $action->handle($category,$request->validated()); return back()->with('success','Category updated.'); }
 public function destroy(Category $category,DeleteCategory $action): RedirectResponse { $this->authorize('delete', $category); $action->handle($category); return to_route('admin.categories.index')->with('success','Category deleted.'); }
 public function restore(int $id,RestoreCategory $action): RedirectResponse { $category=Category::withTrashed()->findOrFail($id); $this->authorize('restore',$category); $action->handle($category); return back()->with('success','Category restored.'); }
}
