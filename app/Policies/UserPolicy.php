<?php
namespace App\Policies;
use App\Models\User;
class UserPolicy { use RequiresAdministrator; public function viewAny(User $user): bool{return true;} public function view(User $user,User $model): bool{return true;} }