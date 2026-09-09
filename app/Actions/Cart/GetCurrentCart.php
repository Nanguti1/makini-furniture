<?php
namespace App\Actions\Cart;
use App\Models\Cart;
use App\Models\User;
class GetCurrentCart { public function handle(?User $user,?string $sessionId): Cart { if($user) return Cart::query()->firstOrCreate(['user_id'=>$user->id,'status'=>'active']); abort_unless($sessionId,422,'A guest cart requires a session identifier.'); return Cart::query()->firstOrCreate(['session_id'=>$sessionId,'status'=>'active']); } }
