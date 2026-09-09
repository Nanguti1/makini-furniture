<?php

namespace App\Http\Requests\Admin\Merchandising;

use App\Models\Lookbook;
use Illuminate\Foundation\Http\FormRequest;

class StoreLookbookRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('create', Lookbook::class) ?? false;
    }

    /**
     * @return array<string, array<string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:lookbooks,slug'],
            'description' => ['nullable', 'string'],
            'hero_image' => ['required', 'string', 'max:2048'],
            'status' => ['nullable', 'in:draft,published'],
            'published_at' => ['nullable', 'date'],
        ];
    }
}
