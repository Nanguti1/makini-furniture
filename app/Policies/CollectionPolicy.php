<?php
namespace App\Policies;
use App\Models\Collection;
use App\Models\User;
class CollectionPolicy { use RequiresAdministrator; public function viewAny(User $user): bool { return false; } public function view(User $user, Collection $model): bool { return false; } public function create(User $user): bool { return false; } public function update(User $user, Collection $model): bool { return false; } public function delete(User $user, Collection $model): bool { return false; } public function restore(User $user, Collection $model): bool { return false; } }
