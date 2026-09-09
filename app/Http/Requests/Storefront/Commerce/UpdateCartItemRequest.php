<?php
namespace App\Http\Requests\Storefront\Commerce;
use App\Models\CartItem; use Illuminate\Foundation\Http\FormRequest;
class UpdateCartItemRequest extends FormRequest { public function authorize():bool{$item=$this->route('item');return $item instanceof CartItem && (($this->user()&&$item->cart->user_id===$this->user()->id)||(!$item->cart->user_id&&$item->cart->session_id===$this->session()->getId()));} public function rules():array{return ['quantity'=>['required','integer','min:0','max:100']];} }
