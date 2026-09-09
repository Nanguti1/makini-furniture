<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Queries\Account\OrderHistoryQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(Request $request, OrderHistoryQuery $query): Response
    {
        $this->authorize('viewAny', Order::class);

        return Inertia::render('Account/Orders/Index', [
            'orders' => $query->paginate(auth()->user(), $request->input('per_page', 15)),
        ]);
    }

    public function show(Order $order, OrderHistoryQuery $query): Response
    {
        $this->authorize('view', $order);

        $order = $query->findForUser(auth()->user(), $order->id);

        abort_unless($order, 404);

        return Inertia::render('Account/Orders/Show', [
            'order' => $order,
        ]);
    }
}
