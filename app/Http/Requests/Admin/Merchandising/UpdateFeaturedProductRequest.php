<?php

namespace App\Http\Requests\Admin\Merchandising;

use App\Models\FeaturedProduct;
use Illuminate\Foundation\Http\FormRequest;

class UpdateFeaturedProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('update', FeaturedProduct::class) ?? false;
    }

    /**
     * @return array<string, array<string>>
     */
    public function rules(): array
    {
        return [
            'product_id' => ['sometimes', 'required', 'exists:products,id'],
            'placement' => ['sometimes', 'required', 'string', 'in:home,category,collection,product'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', 'after:starts_at'],
            'is_active' => ['boolean'],
        ];
    }
}
