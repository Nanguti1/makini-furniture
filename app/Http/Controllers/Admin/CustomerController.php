<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\{Inertia, Response};
use Spatie\Permission\Models\Role;

class CustomerController extends Controller
{
    public function index(): Response
    {
        $this->authorize('view customers');

        $customerRole = Role::where('name', 'Customer')->first();
        $query = $customerRole ? User::role($customerRole) : User::query();

        // Search
        if (request()->has('search')) {
            $query->where('name', 'like', '%' . request('search') . '%')
                ->orWhere('email', 'like', '%' . request('search') . '%');
        }

        return Inertia::render('admin/customers/index', [
            'customers' => $query->latest()->paginate(),
            'filters' => request()->only(['search']),
            'breadcrumbs' => [['title' => 'Customers', 'href' => route('admin.customers.index')]],
        ]);
    }

    public function show(User $customer): Response
    {
        $this->authorize('view customer details');

        return Inertia::render('admin/customers/show', [
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
            'breadcrumbs' => [['title' => 'Customers', 'href' => route('admin.customers.index')], ['title' => 'View', 'href' => route('admin.customers.show', $customer)]],
        ]);
    }
}