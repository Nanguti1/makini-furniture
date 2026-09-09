<?php
namespace App\Actions\Catalog\Categories;
use App\Models\Category;
class DeleteCategory { public function handle(Category $category): bool { return $category->delete(); } }
