<?php
namespace App\Policies;
use App\Models\ProductVariant;
use App\Models\User;
class ProductVariantPolicy { use RequiresAdministrator; public function viewAny(User $user): bool { return false; } public function view(User $user, ProductVariant $model): bool { return false; } public function create(User $user): bool { return false; } public function update(User $user, ProductVariant $model): bool { return false; } public function delete(User $user, ProductVariant $model): bool { return false; } public function restore(User $user, ProductVariant $model): bool { return false; } }
