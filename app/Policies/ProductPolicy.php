<?php
namespace App\Policies;
use App\Models\Product;
use App\Models\User;
class ProductPolicy { use RequiresAdministrator; public function viewAny(User $user): bool { return false; } public function view(User $user, Product $model): bool { return false; } public function create(User $user): bool { return false; } public function update(User $user, Product $model): bool { return false; } public function delete(User $user, Product $model): bool { return false; } public function restore(User $user, Product $model): bool { return false; } }
