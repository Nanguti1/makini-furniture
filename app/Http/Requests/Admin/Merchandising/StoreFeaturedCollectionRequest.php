<?php

namespace App\Http\Requests\Admin\Merchandising;

use App\Models\FeaturedCollection;
use Illuminate\Foundation\Http\FormRequest;

class StoreFeaturedCollectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('create', FeaturedCollection::class) ?? false;
    }

    /**
     * @return array<string, array<string>>
     */
    public function rules(): array
    {
        return [
            'collection_id' => ['required', 'exists:collections,id'],
            'placement' => ['required', 'string', 'in:home,category,product'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', 'after:starts_at'],
            'is_active' => ['boolean'],
        ];
    }
}
