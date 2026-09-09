<?php
namespace App\Policies;
use App\Models\Warehouse;
use App\Models\User;
class WarehousePolicy { use RequiresAdministrator; public function viewAny(User $user): bool { return false; } public function view(User $user, Warehouse $model): bool { return false; } public function create(User $user): bool { return false; } public function update(User $user, Warehouse $model): bool { return false; } public function delete(User $user, Warehouse $model): bool { return false; } public function restore(User $user, Warehouse $model): bool { return false; } }
