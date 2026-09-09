<?php
namespace App\Http\Requests\Admin\Catalog;
use App\Models\ProductFamily;
use Illuminate\Foundation\Http\FormRequest;
class StoreProductFamilyRequest extends FormRequest { use CatalogRequestRules; public function authorize(): bool { return $this->user()?->can('create', ProductFamily::class) ?? false; } public function rules(): array { $id=null; return ['brand_id'=>['nullable','integer','exists:brands,id'],'collection_id'=>['nullable','integer','exists:collections,id'],'name'=>['required','string','max:255'],'slug'=>$this->slugRules('product_families',$id),'description'=>['nullable','string'],'hero_image'=>['nullable','string','max:2048'],'is_active'=>$this->flagRules(),'sort_order'=>['nullable','integer','min:0']]; } }
