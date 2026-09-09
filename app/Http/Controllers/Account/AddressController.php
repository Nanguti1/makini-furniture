<?php

namespace App\Http\Controllers\Account;

use App\Actions\Account\CreateAddress;
use App\Actions\Account\DeleteAddress;
use App\Actions\Account\UpdateAddress;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\StoreAddressRequest;
use App\Http\Requests\Account\UpdateAddressRequest;
use App\Models\Address;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AddressController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Address::class);

        return Inertia::render('Account/Addresses/Index', [
            'addresses' => auth()->user()->addresses()->orderBy('is_default', 'desc')->latest()->get(),
        ]);
    }

    public function store(StoreAddressRequest $request, CreateAddress $action): RedirectResponse
    {
        $action->handle(auth()->user(), $request->validated());

        return back()->with('success', 'Address added.');
    }

    public function update(UpdateAddressRequest $request, Address $address, UpdateAddress $action): RedirectResponse
    {
        $this->authorize('update', $address);
        $action->handle($address, $request->validated());

        return back()->with('success', 'Address updated.');
    }

    public function destroy(Address $address, DeleteAddress $action): RedirectResponse
    {
        $this->authorize('delete', $address);
        $action->handle($address);

        return back()->with('success', 'Address deleted.');
    }
}
