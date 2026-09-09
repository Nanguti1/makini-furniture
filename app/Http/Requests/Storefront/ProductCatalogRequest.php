<?php
namespace App\Http\Requests\Storefront;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class ProductCatalogRequest extends FormRequest { public function authorize(): bool { return true; } public function rules(): array { return ['search'=>['nullable','string','max:120'],'category'=>['nullable','string','max:255'],'collection'=>['nullable','string','max:255'],'brand'=>['nullable','string','max:255'],'room'=>['nullable','string','max:255'],'material'=>['nullable','string','max:255'],'finish'=>['nullable','string','max:255'],'color'=>['nullable','string','max:255'],'min_price'=>['nullable','decimal:0,2','min:0'],'max_price'=>['nullable','decimal:0,2','gte:min_price'],'available'=>['nullable','boolean'],'sort'=>['nullable',Rule::in(['newest','name','price_low','price_high'])],'per_page'=>['nullable','integer','min:1','max:60']]; } }
