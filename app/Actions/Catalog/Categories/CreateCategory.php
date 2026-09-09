<?php
namespace App\Actions\Catalog\Categories;
use App\Actions\Catalog\CreatesCatalogRecord;
use App\Models\Category;
class CreateCategory { use CreatesCatalogRecord; /** @param array<string,mixed> $attributes */ public function handle(array $attributes): Category { return $this->createRecord(Category::class, $attributes); } }
