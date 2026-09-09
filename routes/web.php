<?php

use App\Http\Controllers\Storefront\CatalogController;
use App\Http\Controllers\Storefront\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', [CatalogController::class, 'home'])->name('home');
Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');
Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');

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
});

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function (): void {
    Route::resource('products', \App\Http\Controllers\Admin\Catalog\ProductController::class)->except('show');
    Route::post('products/{product}/publish', [\App\Http\Controllers\Admin\Catalog\ProductController::class, 'publish'])->name('products.publish');
    Route::post('products/{product}/unpublish', [\App\Http\Controllers\Admin\Catalog\ProductController::class, 'unpublish'])->name('products.unpublish');
});
