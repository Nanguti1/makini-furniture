<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $this->authorize('viewAny', Order::class);

        // Get dashboard statistics from existing data
        $stats = [
            'total_revenue' => Order::where('status', '!=', 'cancelled')->sum('grand_total'),
            'total_orders' => Order::count(),
            'total_products' => Product::count(),
            'total_customers' => User::where('is_admin', false)->count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'active_products' => Product::where('is_active', true)->count(),
        ];

        // Get recent orders
        $recentOrders = Order::with('user:id,name,email')
            ->latest()
            ->take(5)
            ->get(['id', 'order_number', 'status', 'grand_total', 'created_at', 'user_id']);

        // Get recent customers
        $recentCustomers = User::where('is_admin', false)
            ->latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'created_at']);

        // Get low stock products (using variants with stock)
        $lowStockProducts = Product::whereHas('variants', function ($query) {
            $query->where('stock_quantity', '<=', 10);
        })
        ->with(['variants' => function ($query) {
            $query->where('stock_quantity', '<=', 10);
        }])
        ->take(5)
        ->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Dashboard/Index', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
            'recentCustomers' => $recentCustomers,
            'lowStockProducts' => $lowStockProducts,
        ]);
    }
}