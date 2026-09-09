<?php
namespace App\Policies;
use App\Models\Category;
use App\Models\User;
class CategoryPolicy { use RequiresAdministrator; public function viewAny(User $user): bool { return false; } public function view(User $user, Category $model): bool { return false; } public function create(User $user): bool { return false; } public function update(User $user, Category $model): bool { return false; } public function delete(User $user, Category $model): bool { return false; } public function restore(User $user, Category $model): bool { return false; } }
