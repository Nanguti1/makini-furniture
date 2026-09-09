<?php

namespace App\Http\Requests\Admin\Merchandising;

use App\Models\FeaturedCollection;
use Illuminate\Foundation\Http\FormRequest;

class UpdateFeaturedCollectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('update', FeaturedCollection::class) ?? false;
    }

    /**
     * @return array<string, array<string>>
     */
    public function rules(): array
    {
        return [
            'collection_id' => ['sometimes', 'required', 'exists:collections,id'],
            'placement' => ['sometimes', 'required', 'string', 'in:home,category,product'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', 'after:starts_at'],
            'is_active' => ['boolean'],
        ];
    }
}
