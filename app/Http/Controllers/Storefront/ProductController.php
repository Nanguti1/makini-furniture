<?php
namespace App\Http\Controllers\Storefront;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\Pricing\PricingService;
use Inertia\Inertia;
use Inertia\Response;
class ProductController extends Controller { public function show(Product $product, PricingService $pricing): Response { abort_unless($product->status->value==='active' && $product->is_active,404); $product->load(['brand','category','collection','productFamily','variants.optionValues.option','variants.images','images','videos','documents','dimensions','materials','finishes','colors','tags','features','rooms','relatedProducts.images','reviews'=>fn($q)=>$q->where('status','approved')->with('user:id,name')]); return Inertia::render('Storefront/Products/Show',['product'=>$product,'effectivePrices'=>$product->variants->mapWithKeys(fn($variant)=>[$variant->id=>$pricing->effectivePrice($product,$variant)]),'productPrice'=>$pricing->effectivePrice($product)]); } }
