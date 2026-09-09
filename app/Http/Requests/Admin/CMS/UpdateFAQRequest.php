<?php

namespace App\Http\Requests\Admin\CMS;

use App\Models\FAQ;
use Illuminate\Foundation\Http\FormRequest;

class UpdateFAQRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('update', FAQ::class) ?? false;
    }

    /**
     * @return array<string, array<string>>
     */
    public function rules(): array
    {
        return [
            'question' => ['sometimes', 'required', 'string', 'max:500'],
            'answer' => ['sometimes', 'required', 'string'],
            'category' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
