<?php
namespace App\Actions\Catalog\Categories;
use App\Models\Category;
class RestoreCategory { public function handle(Category $category): bool { return $category->restore(); } }
