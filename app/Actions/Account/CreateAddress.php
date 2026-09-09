<?php

namespace App\Actions\Account;

use App\Actions\Cart\SetDefaultAddress;
use App\Models\Address;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CreateAddress
{
    public function handle(User $user, array $attributes): Address
    {
        return DB::transaction(function () use ($user, $attributes) {
            $address = $user->addresses()->create($attributes);

            if ($attributes['is_default'] ?? false) {
                app(SetDefaultAddress::class)->handle($address);
            }

            return $address->refresh();
        });
    }
}
