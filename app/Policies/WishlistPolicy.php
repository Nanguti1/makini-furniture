<?php
namespace App\Policies;
use App\Models\Wishlist; use App\Models\User;
class WishlistPolicy { public function view(User $user,Wishlist $wishlist): bool{return $wishlist->user_id===$user->id;} public function update(User $user,Wishlist $wishlist): bool{return $this->view($user,$wishlist);} public function delete(User $user,Wishlist $wishlist): bool{return $this->view($user,$wishlist);} }
