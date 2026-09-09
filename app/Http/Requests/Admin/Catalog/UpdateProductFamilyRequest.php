<?php
namespace App\Http\Requests\Admin\Catalog;
use App\Models\ProductFamily;
use Illuminate\Foundation\Http\FormRequest;
class UpdateProductFamilyRequest extends FormRequest { use CatalogRequestRules; public function authorize(): bool { return $this->user()?->can('update', ProductFamily::class) ?? false; } public function rules(): array { $id=$this->route('productFamily')?->id; return ['brand_id'=>['nullable','integer','exists:brands,id'],'collection_id'=>['nullable','integer','exists:collections,id'],'name'=>['required','string','max:255'],'slug'=>$this->slugRules('product_families',$id),'description'=>['nullable','string'],'hero_image'=>['nullable','string','max:2048'],'is_active'=>$this->flagRules(),'sort_order'=>['nullable','integer','min:0']]; } }
