<?php

namespace App\Queries\Account;

use App\Models\Order;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class OrderHistoryQuery
{
    public function paginate(User $user, int $perPage = 15): LengthAwarePaginator
    {
        return Order::query()
            ->where('user_id', $user->id)
            ->with(['items.product:id,name,slug', 'items.product.images' => fn($q) => $q->where('is_primary', true)->select('id', 'product_id', 'url')])
            ->latest('created_at')
            ->paginate($perPage);
    }

    public function findForUser(User $user, int $orderId): ?Order
    {
        return Order::query()
            ->where('user_id', $user->id)
            ->where('id', $orderId)
            ->with(['items.product', 'items.product.images', 'items.variant'])
            ->first();
    }
}
