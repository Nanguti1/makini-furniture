<?php

namespace App\Http\Requests\Admin\Merchandising;

use App\Models\Banner;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBannerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('update', Banner::class) ?? false;
    }

    /**
     * @return array<string, array<string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'image' => ['sometimes', 'required', 'string', 'max:2048'],
            'mobile_image' => ['nullable', 'string', 'max:2048'],
            'link' => ['nullable', 'string', 'max:2048'],
            'link_type' => ['nullable', 'string', 'in:product,collection,category,page,external'],
            'placement' => ['sometimes', 'required', 'string', 'in:hero,category,collection,product'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', 'after:starts_at'],
            'is_active' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
