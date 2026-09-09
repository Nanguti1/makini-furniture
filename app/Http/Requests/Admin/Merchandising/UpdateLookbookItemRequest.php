<?php

namespace App\Http\Requests\Admin\Merchandising;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLookbookItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('update', \App\Models\LookbookItem::class) ?? false;
    }

    /**
     * @return array<string, array<string>>
     */
    public function rules(): array
    {
        return [
            'product_id' => ['nullable', 'exists:products,id'],
            'image' => ['sometimes', 'required', 'string', 'max:2048'],
            'title' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
