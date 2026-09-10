<?php

namespace App\Http\Requests\Storefront\Commerce;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'cart_id' => ['required', 'integer', 'exists:carts,id'],
            'billing_address_id' => ['required', 'integer', 'exists:addresses,id'],
            'shipping_address_id' => ['required', 'integer', 'exists:addresses,id'],
            'payment_method' => ['required', 'string', 'in:manual,card,paypal'],
            'currency' => ['required', 'string', 'size:3'],
        ];
    }
}
