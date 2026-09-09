<?php
namespace App\Http\Requests\Storefront\Commerce;
use App\Models\Cart; use Illuminate\Foundation\Http\FormRequest;
class AddToCartRequest extends FormRequest { public function authorize():bool{$cart=$this->route('cart');return $cart instanceof Cart && (($this->user()&&$cart->user_id===$this->user()->id)||(!$cart->user_id&&$cart->session_id===$this->session()->getId()));} public function rules():array{return ['product_id'=>['required','integer','exists:products,id'],'product_variant_id'=>['nullable','integer','exists:product_variants,id'],'quantity'=>['required','integer','min:1','max:100']];} }
