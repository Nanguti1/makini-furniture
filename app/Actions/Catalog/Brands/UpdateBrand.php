<?php
namespace App\Actions\Catalog\Brands;
use App\Actions\Catalog\CreatesCatalogRecord;
use App\Models\Brand;
class UpdateBrand { use CreatesCatalogRecord; /** @param array<string,mixed> $attributes */ public function handle(Brand $brand, array $attributes): Brand { return $this->updateRecord($brand, $attributes); } }
