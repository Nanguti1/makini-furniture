<?php
namespace App\Actions\Catalog\Brands;
use App\Actions\Catalog\CreatesCatalogRecord;
use App\Models\Brand;
class CreateBrand { use CreatesCatalogRecord; /** @param array<string,mixed> $attributes */ public function handle(array $attributes): Brand { return $this->createRecord(Brand::class, $attributes); } }
