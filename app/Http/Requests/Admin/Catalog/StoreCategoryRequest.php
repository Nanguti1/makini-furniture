<?php
namespace App\Http\Requests\Admin\Catalog;
use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
class StoreCategoryRequest extends FormRequest { use CatalogRequestRules; public function authorize(): bool { return $this->user()?->can('create', Category::class) ?? false; } public function rules(): array { $id=null; return ['parent_id'=>['nullable','integer','exists:categories,id'],'name'=>['required','string','max:255'],'slug'=>$this->slugRules('categories',$id),'description'=>['nullable','string'],'image'=>['nullable','string','max:2048'],'is_active'=>$this->flagRules(),'sort_order'=>['nullable','integer','min:0']]; } }
