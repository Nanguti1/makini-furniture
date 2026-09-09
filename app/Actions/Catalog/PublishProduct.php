<?php
namespace App\Actions\Catalog;
use App\Enums\ProductStatus; use App\Models\Product;
class PublishProduct { public function handle(Product $product): Product { $product->update(['status'=>ProductStatus::Active,'is_active'=>true]); return $product->refresh(); } }
