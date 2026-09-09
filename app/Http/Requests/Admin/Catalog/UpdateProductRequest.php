<?php
namespace App\Http\Requests\Admin\Catalog;
use App\Models\Product;
use Illuminate\Validation\Rule;
class UpdateProductRequest extends StoreProductRequest { public function authorize(): bool{return $this->user()?->can('update',$this->route('product'))??false;} public function rules(): array{$rules=parent::rules(); $product=$this->route('product'); $rules['sku']=['required','string','max:255',Rule::unique('products','sku')->ignore($product)]; $rules['slug']=$this->slugRules('products',$product?->id); return $rules;} }
