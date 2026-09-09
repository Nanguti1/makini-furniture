<?php
namespace App\Http\Requests\Admin\Catalog;
use App\Models\Brand;
use Illuminate\Foundation\Http\FormRequest;
class UpdateBrandRequest extends FormRequest { use CatalogRequestRules; public function authorize(): bool { return $this->user()?->can('update', Brand::class) ?? false; } public function rules(): array { $id=$this->route('brand')?->id; return ['name'=>['required','string','max:255'],'slug'=>$this->slugRules('brands',$id),'description'=>['nullable','string'],'short_description'=>['nullable','string'],'logo'=>['nullable','string','max:2048'],'cover_image'=>['nullable','string','max:2048'],'website_url'=>['nullable','url','max:2048'],'is_active'=>$this->flagRules(),'sort_order'=>['nullable','integer','min:0']]; } }
