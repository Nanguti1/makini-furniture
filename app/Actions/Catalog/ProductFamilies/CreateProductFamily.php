<?php
namespace App\Actions\Catalog\ProductFamilies;
use App\Actions\Catalog\CreatesCatalogRecord;
use App\Models\ProductFamily;
class CreateProductFamily { use CreatesCatalogRecord; /** @param array<string,mixed> $attributes */ public function handle(array $attributes): ProductFamily { return $this->createRecord(ProductFamily::class, $attributes); } }
