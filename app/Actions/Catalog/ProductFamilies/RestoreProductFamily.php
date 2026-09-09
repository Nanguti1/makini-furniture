<?php
namespace App\Actions\Catalog\ProductFamilies;
use App\Models\ProductFamily;
class RestoreProductFamily { public function handle(ProductFamily $productFamily): bool { return $productFamily->restore(); } }
