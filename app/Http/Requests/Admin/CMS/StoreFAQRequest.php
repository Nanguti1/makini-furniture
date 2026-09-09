<?php

namespace App\Http\Requests\Admin\CMS;

use App\Models\FAQ;
use Illuminate\Foundation\Http\FormRequest;

class StoreFAQRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('create', FAQ::class) ?? false;
    }

    /**
     * @return array<string, array<string>>
     */
    public function rules(): array
    {
        return [
            'question' => ['required', 'string', 'max:500'],
            'answer' => ['required', 'string'],
            'category' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
