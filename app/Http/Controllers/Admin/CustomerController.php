<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\{Inertia, Response};

class CustomerController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', User::class);

        $query = User::query()->where('is_admin', false);

        // Search
        if (request()->has('search')) {
            $query->where('name', 'like', '%' . request('search') . '%')
                ->orWhere('email', 'like', '%' . request('search') . '%');
        }

        return Inertia::render('Admin/Customers/Index', [
            'customers' => $query->latest()->paginate(),
            'filters' => request()->only(['search']),
        ]);
    }

    public function show(User $customer): Response
    {
        $this->authorize('view', $customer);

        return Inertia::render('Admin/Customers/Show', [
            'customer' => $customer->load([
                'addresses',
                'orders' => function ($query) {
                    $query->latest()->limit(10);
                },
                'reviews' => function ($query) {
                    $query->latest()->limit(10);
                },
                'wishlists.items.product:id,name,slug,price',
            ]),
        ]);
    }
}