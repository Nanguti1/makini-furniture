<?php

use App\Http\Controllers\Storefront\CatalogController;
use App\Http\Controllers\Storefront\ProductController;
use App\Http\Controllers\Storefront\LookbookController;
use App\Http\Controllers\Storefront\PageController;
use App\Http\Controllers\Storefront\FAQController;
use Illuminate\Support\Facades\Route;

Route::get('/', [CatalogController::class, 'home'])->name('home');
Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');
Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');

Route::get('/lookbooks', [LookbookController::class, 'index'])->name('lookbooks.index');
Route::get('/lookbooks/{slug}', [LookbookController::class, 'show'])->name('lookbooks.show');

Route::get('/pages/{slug}', [PageController::class, 'show'])->name('pages.show');

Route::get('/faqs', [FAQController::class, 'index'])->name('faqs.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function (): void {
    Route::resource('brands', \App\Http\Controllers\Admin\Catalog\BrandController::class)->except('show');
    Route::post('brands/{id}/restore', [\App\Http\Controllers\Admin\Catalog\BrandController::class, 'restore'])->name('brands.restore');
    Route::resource('categories', \App\Http\Controllers\Admin\Catalog\CategoryController::class)->except('show');
    Route::post('categories/{id}/restore', [\App\Http\Controllers\Admin\Catalog\CategoryController::class, 'restore'])->name('categories.restore');
    Route::resource('collections', \App\Http\Controllers\Admin\Catalog\CollectionController::class)->except('show');
    Route::post('collections/{id}/restore', [\App\Http\Controllers\Admin\Catalog\CollectionController::class, 'restore'])->name('collections.restore');
    Route::resource('product-families', \App\Http\Controllers\Admin\Catalog\ProductFamilyController::class)->except('show');
    Route::post('product-families/{id}/restore', [\App\Http\Controllers\Admin\Catalog\ProductFamilyController::class, 'restore'])->name('product-families.restore');
    Route::resource('products', \App\Http\Controllers\Admin\Catalog\ProductController::class)->except('show');
    Route::post('products/{product}/publish', [\App\Http\Controllers\Admin\Catalog\ProductController::class, 'publish'])->name('products.publish');
    Route::post('products/{product}/unpublish', [\App\Http\Controllers\Admin\Catalog\ProductController::class, 'unpublish'])->name('products.unpublish');

    Route::resource('banners', \App\Http\Controllers\Admin\Merchandising\BannerController::class)->except('show');
    Route::post('banners/{banner}/activate', [\App\Http\Controllers\Admin\Merchandising\BannerController::class, 'activate'])->name('banners.activate');
    Route::post('banners/{banner}/deactivate', [\App\Http\Controllers\Admin\Merchandising\BannerController::class, 'deactivate'])->name('banners.deactivate');
    Route::post('banners/reorder', [\App\Http\Controllers\Admin\Merchandising\BannerController::class, 'reorder'])->name('banners.reorder');

    Route::resource('lookbooks', \App\Http\Controllers\Admin\Merchandising\LookbookController::class)->except('show');
    Route::post('lookbooks/{lookbook}/publish', [\App\Http\Controllers\Admin\Merchandising\LookbookController::class, 'publish'])->name('lookbooks.publish');
    Route::post('lookbooks/{lookbook}/unpublish', [\App\Http\Controllers\Admin\Merchandising\LookbookController::class, 'unpublish'])->name('lookbooks.unpublish');
    Route::post('lookbooks/items', [\App\Http\Controllers\Admin\Merchandising\LookbookController::class, 'storeItem'])->name('lookbooks.items.store');
    Route::put('lookbooks/items/{id}', [\App\Http\Controllers\Admin\Merchandising\LookbookController::class, 'updateItem'])->name('lookbooks.items.update');
    Route::delete('lookbooks/items/{id}', [\App\Http\Controllers\Admin\Merchandising\LookbookController::class, 'destroyItem'])->name('lookbooks.items.destroy');
    Route::post('lookbooks/items/reorder', [\App\Http\Controllers\Admin\Merchandising\LookbookController::class, 'reorderItems'])->name('lookbooks.items.reorder');

    Route::resource('featured-products', \App\Http\Controllers\Admin\Merchandising\FeaturedProductController::class)->except('show');
    Route::post('featured-products/reorder', [\App\Http\Controllers\Admin\Merchandising\FeaturedProductController::class, 'reorder'])->name('featured-products.reorder');

    Route::resource('featured-collections', \App\Http\Controllers\Admin\Merchandising\FeaturedCollectionController::class)->except('show');
    Route::post('featured-collections/reorder', [\App\Http\Controllers\Admin\Merchandising\FeaturedCollectionController::class, 'reorder'])->name('featured-collections.reorder');

    Route::resource('pages', \App\Http\Controllers\Admin\CMS\PageController::class)->except('show');
    Route::post('pages/{page}/publish', [\App\Http\Controllers\Admin\CMS\PageController::class, 'publish'])->name('pages.publish');
    Route::post('pages/{page}/unpublish', [\App\Http\Controllers\Admin\CMS\PageController::class, 'unpublish'])->name('pages.unpublish');
    Route::post('pages/sections', [\App\Http\Controllers\Admin\CMS\PageController::class, 'storeSection'])->name('pages.sections.store');
    Route::put('pages/sections/{id}', [\App\Http\Controllers\Admin\CMS\PageController::class, 'updateSection'])->name('pages.sections.update');
    Route::delete('pages/sections/{id}', [\App\Http\Controllers\Admin\CMS\PageController::class, 'destroySection'])->name('pages.sections.destroy');
    Route::post('pages/sections/reorder', [\App\Http\Controllers\Admin\CMS\PageController::class, 'reorderSections'])->name('pages.sections.reorder');

    Route::resource('faqs', \App\Http\Controllers\Admin\CMS\FAQController::class)->except('show');
    Route::post('faqs/{faq}/activate', [\App\Http\Controllers\Admin\CMS\FAQController::class, 'activate'])->name('faqs.activate');
    Route::post('faqs/{faq}/deactivate', [\App\Http\Controllers\Admin\CMS\FAQController::class, 'deactivate'])->name('faqs.deactivate');
    Route::post('faqs/reorder', [\App\Http\Controllers\Admin\CMS\FAQController::class, 'reorder'])->name('faqs.reorder');
});

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('/orders', [\App\Http\Controllers\Storefront\Commerce\OrderController::class, 'index'])->name('orders.index');
    Route::post('/orders', [\App\Http\Controllers\Storefront\Commerce\OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/{order}', [\App\Http\Controllers\Storefront\Commerce\OrderController::class, 'show'])->name('orders.show');
});
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function (): void {
    Route::get('/orders', [\App\Http\Controllers\Admin\OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [\App\Http\Controllers\Admin\OrderController::class, 'show'])->name('orders.show');
    Route::patch('/orders/{order}/status', [\App\Http\Controllers\Admin\OrderController::class, 'update'])->name('orders.status');
    Route::post('/orders/{order}/cancel', [\App\Http\Controllers\Admin\OrderController::class, 'cancel'])->name('orders.cancel');
});

Route::get('/cart', [\App\Http\Controllers\Storefront\Commerce\CartController::class, 'show'])->name('cart.show');
Route::post('/carts/{cart}/items', [\App\Http\Controllers\Storefront\Commerce\CartController::class, 'store'])->name('cart.items.store');
Route::patch('/cart-items/{item}', [\App\Http\Controllers\Storefront\Commerce\CartController::class, 'update'])->name('cart.items.update');
Route::delete('/cart-items/{item}', [\App\Http\Controllers\Storefront\Commerce\CartController::class, 'destroy'])->name('cart.items.destroy');
