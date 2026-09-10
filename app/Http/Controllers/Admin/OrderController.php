<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateOrderStatusRequest;
use App\Models\Order;
use App\Services\Orders\OrderService;
use Illuminate\Http\RedirectResponse;
use Inertia\{Inertia,Response};

class OrderController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Order::class);

        $query = Order::query()->with('user:id,name,email');

        // Search
        if (request()->has('search')) {
            $query->where('order_number', 'like', '%' . request('search') . '%')
                ->orWhereHas('user', function ($q) {
                    $q->where('name', 'like', '%' . request('search') . '%')
                        ->orWhere('email', 'like', '%' . request('search') . '%');
                });
        }

        // Status filter
        if (request()->has('status')) {
            $query->where('status', request('status'));
        }

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $query->latest()->paginate(),
            'filters' => request()->only(['search', 'status']),
        ]);
    }

    public function show(Order $order): Response
    {
        $this->authorize('view', $order);

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order->load(['items', 'user', 'items.product:id,name,slug,price', 'items.variant:id,name,sku']),
        ]);
    }

    public function update(UpdateOrderStatusRequest $request, Order $order, OrderService $service): RedirectResponse
    {
        $this->authorize('update', $order);
        $service->transition($order, $request->enum('status', \App\Enums\OrderStatus::class));
        return back()->with('success', 'Order status updated.');
    }

    public function cancel(Order $order, OrderService $service): RedirectResponse
    {
        $this->authorize('update', $order);
        $service->cancel($order);
        return back()->with('success', 'Order cancelled.');
    }
}
