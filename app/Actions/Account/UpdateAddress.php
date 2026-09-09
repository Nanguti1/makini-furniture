<?php

namespace App\Actions\Account;

use App\Actions\Cart\SetDefaultAddress;
use App\Models\Address;
use Illuminate\Support\Facades\DB;

class UpdateAddress
{
    public function handle(Address $address, array $attributes): Address
    {
        return DB::transaction(function () use ($address, $attributes) {
            $address->update($attributes);

            if ($attributes['is_default'] ?? false) {
                app(SetDefaultAddress::class)->handle($address);
            }

            return $address->refresh();
        });
    }
}
