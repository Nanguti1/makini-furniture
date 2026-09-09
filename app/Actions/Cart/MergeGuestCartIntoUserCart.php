<?php
namespace App\Actions\Cart;
use App\Models\Cart;
use App\Models\User;
use Illuminate\Support\Facades\DB;
class MergeGuestCartIntoUserCart { public function handle(Cart $guest,User $user): Cart { return DB::transaction(function() use($guest,$user) { $cart=Cart::query()->firstOrCreate(['user_id'=>$user->id,'status'=>'active']); foreach($guest->items()->lockForUpdate()->get() as $item) { $existing=$cart->items()->where('product_id',$item->product_id)->where('product_variant_id',$item->product_variant_id)->first(); $existing ? $existing->increment('quantity',$item->quantity) : $cart->items()->create($item->only(['product_id','product_variant_id','quantity','unit_price'])); } $guest->items()->delete(); $guest->update(['status'=>'converted','session_id'=>null]); return $cart->load('items'); }); } }
