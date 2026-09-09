<?php
namespace App\Actions\Catalog;
use App\Enums\ProductStatus; use App\Models\Product;
class UnpublishProduct { public function handle(Product $product): Product { $product->update(['status'=>ProductStatus::Draft,'is_active'=>false]); return $product->refresh(); } }
