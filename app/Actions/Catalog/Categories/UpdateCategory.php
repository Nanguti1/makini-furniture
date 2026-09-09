<?php
namespace App\Actions\Catalog\Categories;
use App\Actions\Catalog\CreatesCatalogRecord;
use App\Models\Category;
class UpdateCategory { use CreatesCatalogRecord; /** @param array<string,mixed> $attributes */ public function handle(Category $category, array $attributes): Category { return $this->updateRecord($category, $attributes); } }
