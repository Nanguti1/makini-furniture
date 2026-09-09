<?php
namespace App\Http\Requests\Admin\Catalog;
use App\Models\Collection;
use Illuminate\Foundation\Http\FormRequest;
class StoreCollectionRequest extends FormRequest { use CatalogRequestRules; public function authorize(): bool { return $this->user()?->can('create', Collection::class) ?? false; } public function rules(): array { $id=null; return ['brand_id'=>['nullable','integer','exists:brands,id'],'name'=>['required','string','max:255'],'slug'=>$this->slugRules('collections',$id),'description'=>['nullable','string'],'short_description'=>['nullable','string'],'hero_image'=>['nullable','string','max:2048'],'banner_image'=>['nullable','string','max:2048'],'is_featured'=>$this->flagRules(),'is_active'=>$this->flagRules(),'sort_order'=>['nullable','integer','min:0']]; } }
