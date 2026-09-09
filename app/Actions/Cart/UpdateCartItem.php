<?php
namespace App\Actions\Cart;
use App\Models\CartItem;
class UpdateCartItem { public function handle(CartItem $item,int $quantity): CartItem { if($quantity<1) { $item->delete(); return $item; } $item->update(['quantity'=>$quantity]); return $item->refresh(); } }
