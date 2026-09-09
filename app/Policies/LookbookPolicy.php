<?php
namespace App\Policies;
use App\Models\Lookbook;
use App\Models\User;
class LookbookPolicy { use RequiresAdministrator; public function viewAny(User $user): bool { return false; } public function view(User $user, Lookbook $model): bool { return false; } public function create(User $user): bool { return false; } public function update(User $user, Lookbook $model): bool { return false; } public function delete(User $user, Lookbook $model): bool { return false; } public function restore(User $user, Lookbook $model): bool { return false; } }
