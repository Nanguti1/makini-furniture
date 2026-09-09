<?php
namespace App\Actions\Cart;
use App\Models\Address; use Illuminate\Support\Facades\DB;
class SetDefaultAddress { public function handle(Address $address): Address { return DB::transaction(function() use($address) { Address::query()->where('user_id',$address->user_id)->update(['is_default'=>false]); $address->update(['is_default'=>true]); return $address->refresh(); }); } }
