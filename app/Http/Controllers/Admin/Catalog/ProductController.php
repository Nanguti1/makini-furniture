<?php
namespace App\Http\Controllers\Admin\Catalog;
use App\Actions\Catalog\{CreateProduct,UpdateProduct,PublishProduct,UnpublishProduct};
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Catalog\{StoreProductRequest,UpdateProductRequest};
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Inertia\{Inertia,Response};

class ProductController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Product::class);

        $query = Product::query()->with(['brand', 'category', 'productFamily']);

        // Search
        if (request()->has('search')) {
            $query->where('name', 'like', '%' . request('search') . '%')
                ->orWhere('sku', 'like', '%' . request('search') . '%')
                ->orWhere('slug', 'like', '%' . request('search') . '%');
        }

        // Status filter
        if (request()->has('status')) {
            if (request('status') === 'published') {
                $query->where('status', 'published');
            } elseif (request('status') === 'draft') {
                $query->where('status', 'draft');
            } elseif (request('status') === 'archived') {
                $query->where('status', 'archived');
            }
        }

        // Featured filter
        if (request()->has('featured')) {
            if (request('featured') === 'featured') {
                $query->where('is_featured', true);
            } elseif (request('featured') === 'new') {
                $query->where('is_new', true);
            } elseif (request('featured') === 'bestseller') {
                $query->where('is_bestseller', true);
            }
        }

        // Sorting
        $sortColumn = request('sort', 'created_at');
        $sortDirection = request('direction', 'desc');

        // Validate sort column to prevent SQL injection
        $allowedColumns = ['name', 'sku', 'status', 'created_at', 'updated_at', 'sort_order', 'price'];
        if (in_array($sortColumn, $allowedColumns)) {
            $query->orderBy($sortColumn, $sortDirection);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        return Inertia::render('Admin/Products/Index', [
            'products' => $query->paginate(),
            'filters' => request()->only(['search', 'status', 'featured', 'sort', 'direction']),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Product::class);

        return Inertia::render('Admin/Products/Create', [
            'brands' => \App\Models\Brand::all(['id', 'name']),
            'categories' => \App\Models\Category::all(['id', 'name']),
            'collections' => \App\Models\Collection::all(['id', 'name']),
            'productFamilies' => \App\Models\ProductFamily::all(['id', 'name']),
        ]);
    }

    public function store(StoreProductRequest $request, CreateProduct $action): RedirectResponse
    {
        $product = $action->handle($request->validated());
        return to_route('admin.products.edit', $product)->with('success', 'Product created.');
    }

    public function edit(Product $product): Response
    {
        $this->authorize('update', $product);

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product->load([
                'brand',
                'category',
                'collection',
                'productFamily',
                'categories',
                'collections',
                'materials',
                'finishes',
                'colors',
                'tags',
                'features',
                'rooms',
                'variants',
                'images'
            ]),
            'brands' => \App\Models\Brand::all(['id', 'name']),
            'categories' => \App\Models\Category::all(['id', 'name']),
            'collections' => \App\Models\Collection::all(['id', 'name']),
            'productFamilies' => \App\Models\ProductFamily::all(['id', 'name']),
        ]);
    }

    public function show(Product $product): Response
    {
        $this->authorize('view', $product);

        return Inertia::render('Admin/Products/Show', [
            'product' => $product->load([
                'brand',
                'category',
                'collection',
                'productFamily',
                'categories',
                'collections',
                'materials',
                'finishes',
                'colors',
                'tags',
                'features',
                'rooms',
                'variants',
                'images'
            ]),
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product, UpdateProduct $action): RedirectResponse
    {
        $this->authorize('update', $product);
        $action->handle($product, $request->validated());
        return back()->with('success', 'Product updated.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $this->authorize('delete', $product);
        $product->delete();
        return to_route('admin.products.index')->with('success', 'Product deleted.');
    }

    public function publish(Product $product, PublishProduct $action): RedirectResponse
    {
        $this->authorize('update', $product);
        $action->handle($product);
        return back()->with('success', 'Product published.');
    }

    public function unpublish(Product $product, UnpublishProduct $action): RedirectResponse
    {
        $this->authorize('update', $product);
        $action->handle($product);
        return back()->with('success', 'Product unpublished.');
    }
}