<?php
namespace App\Policies;
use App\Models\Brand;
use App\Models\User;
class BrandPolicy { use RequiresAdministrator; public function viewAny(User $user): bool { return false; } public function view(User $user, Brand $model): bool { return false; } public function create(User $user): bool { return false; } public function update(User $user, Brand $model): bool { return false; } public function delete(User $user, Brand $model): bool { return false; } public function restore(User $user, Brand $model): bool { return false; } }
