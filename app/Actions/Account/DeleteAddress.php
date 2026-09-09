<?php

namespace App\Actions\Account;

use App\Models\Address;
use Illuminate\Support\Facades\DB;

class DeleteAddress
{
    public function handle(Address $address): void
    {
        DB::transaction(function () use ($address) {
            $address->delete();
        });
    }
}
