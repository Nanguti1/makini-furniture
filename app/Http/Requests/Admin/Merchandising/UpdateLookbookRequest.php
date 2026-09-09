<?php

namespace App\Http\Requests\Admin\Merchandising;

use App\Models\Lookbook;
use Illuminate\Foundation\Http\FormRequest;

class UpdateLookbookRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('update', Lookbook::class) ?? false;
    }

    /**
     * @return array<string, array<string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:lookbooks,slug,'.$this->route('lookbook')->id],
            'description' => ['nullable', 'string'],
            'hero_image' => ['sometimes', 'required', 'string', 'max:2048'],
            'status' => ['nullable', 'in:draft,published'],
            'published_at' => ['nullable', 'date'],
        ];
    }
}
