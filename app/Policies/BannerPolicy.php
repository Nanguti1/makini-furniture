<?php
namespace App\Policies;
use App\Models\Banner;
use App\Models\User;
class BannerPolicy { use RequiresAdministrator; public function viewAny(User $user): bool { return true; } public function view(User $user, Banner $model): bool { return true; } public function create(User $user): bool { return true; } public function update(User $user, Banner $model): bool { return true; } public function delete(User $user, Banner $model): bool { return true; } public function restore(User $user, Banner $model): bool { return true; } }
