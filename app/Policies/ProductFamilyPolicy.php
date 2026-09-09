<?php
namespace App\Policies;
use App\Models\ProductFamily;
use App\Models\User;
class ProductFamilyPolicy { use RequiresAdministrator; public function viewAny(User $user): bool { return false; } public function view(User $user, ProductFamily $model): bool { return false; } public function create(User $user): bool { return false; } public function update(User $user, ProductFamily $model): bool { return false; } public function delete(User $user, ProductFamily $model): bool { return false; } public function restore(User $user, ProductFamily $model): bool { return false; } }
