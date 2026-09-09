<?php
namespace App\Actions\Catalog\ProductFamilies;
use App\Actions\Catalog\CreatesCatalogRecord;
use App\Models\ProductFamily;
class UpdateProductFamily { use CreatesCatalogRecord; /** @param array<string,mixed> $attributes */ public function handle(ProductFamily $productFamily, array $attributes): ProductFamily { return $this->updateRecord($productFamily, $attributes); } }
