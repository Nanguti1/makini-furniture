<?php
namespace App\Policies;
use App\Models\Inventory;
use App\Models\User;
class InventoryPolicy { use RequiresAdministrator; public function viewAny(User $user): bool { return false; } public function view(User $user, Inventory $model): bool { return false; } public function create(User $user): bool { return false; } public function update(User $user, Inventory $model): bool { return false; } public function delete(User $user, Inventory $model): bool { return false; } public function restore(User $user, Inventory $model): bool { return false; } }
