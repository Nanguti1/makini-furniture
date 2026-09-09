<?php
namespace App\Policies;
use App\Models\Promotion;
use App\Models\User;
class PromotionPolicy { use RequiresAdministrator; public function viewAny(User $user): bool { return false; } public function view(User $user, Promotion $model): bool { return false; } public function create(User $user): bool { return false; } public function update(User $user, Promotion $model): bool { return false; } public function delete(User $user, Promotion $model): bool { return false; } public function restore(User $user, Promotion $model): bool { return false; } }
