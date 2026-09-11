<?php
namespace App\Http\Controllers\Storefront;
use App\Http\Controllers\Controller;
use App\Http\Requests\Storefront\ProductCatalogRequest;
use App\Models\Category;
use App\Queries\Catalog\HomepageQuery;
use App\Queries\Catalog\ProductCatalogQuery;
use Inertia\Inertia;
use Inertia\Response;
class CatalogController extends Controller { public function home(HomepageQuery $query): Response { $data = $query->data(); $data['categories'] = Category::where('is_active',true)->orderBy('sort_order')->get(['id','name','slug','image']); return Inertia::render('Storefront/Home', $data); } public function index(ProductCatalogRequest $request, ProductCatalogQuery $query): Response { return Inertia::render('Storefront/Catalog/Index',['products'=>$query->paginate($request->validated()),'filters'=>$request->validated(),'categories'=>Category::where('is_active',true)->orderBy('sort_order')->get(['id','name','slug','image'])]); } }
