<?php
namespace App\Actions\Catalog\ProductFamilies;
use App\Models\ProductFamily;
class DeleteProductFamily { public function handle(ProductFamily $productFamily): bool { return $productFamily->delete(); } }
