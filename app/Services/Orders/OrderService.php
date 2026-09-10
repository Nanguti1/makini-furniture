<?php

namespace App\Services\Orders;

use App\Enums\CartStatus;
use App\Enums\OrderStatus;
use App\Exceptions\CartItemUnavailableException;
use App\Exceptions\InvalidOrderStatusTransitionException;
use App\Models\{Address, Cart, Inventory, Order, Product, ProductVariant, User};
use App\Services\Inventory\InventoryService;
use App\Services\Pricing\PricingService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderService
{
    public function __construct(
        private PricingService $pricing,
        private InventoryService $inventory
    ) {}

    public function createFromCart(
        User $user,
        Cart $cart,
        Address $billing,
        Address $shipping,
        string $currency,
        string $paymentMethod = 'manual'
    ): Order {
        return DB::transaction(function () use ($user, $cart, $billing, $shipping, $currency, $paymentMethod) {
            // Security check
            if ($cart->user_id !== $user->id || $billing->user_id !== $user->id || $shipping->user_id !== $user->id) {
                abort(403);
            }

            // Lock and reload cart
            $cart = Cart::query()
                ->with(['items.product', 'items.variant'])
                ->lockForUpdate()
                ->findOrFail($cart->id);

            // Validate cart
            if ($cart->status !== CartStatus::Active || $cart->items->isEmpty()) {
                throw new CartItemUnavailableException('An active cart with items is required.');
            }

            // Calculate subtotal and prepare order lines
            $subtotal = 0;
            $lines = [];

            foreach ($cart->items as $item) {
                $product = $item->product;
                $variant = $item->variant;

                // Validate product/variant availability
                if (!$product || !$product->is_active || $product->status->value !== 'active' ||
                    ($variant && (!$variant->is_active || $variant->product_id !== $product->id))) {
                    throw new CartItemUnavailableException('A cart item is unavailable.');
                }

                // Get effective price
                $price = $this->pricing->effectivePrice($product, $variant, $currency);
                if (!$price) {
                    throw new CartItemUnavailableException('A cart item has no active price.');
                }

                $unit = Money::cents($price->amount);
                $subtotal += $unit * $item->quantity;
                $lines[] = [$item, $product, $variant, $unit];
            }

            // Create order
            $order = Order::create(array_merge([
                'user_id' => $user->id,
                'order_number' => $this->number(),
                'status' => OrderStatus::Pending,
                'currency' => $currency,
                'subtotal' => Money::decimal($subtotal),
                'discount_total' => '0.00',
                'shipping_total' => '0.00',
                'tax_total' => '0.00',
                'grand_total' => Money::decimal($subtotal),
            ], $this->snapshot('billing', $billing), $this->snapshot('shipping', $shipping)));

            // Add order metadata for payment method
            $order->update(['metadata' => ['payment_method' => $paymentMethod]]);

            // Create order items
            foreach ($lines as [$item, $product, $variant, $unit]) {
                $total = $unit * $item->quantity;
                $order->items()->create([
                    'product_id' => $product->id,
                    'product_variant_id' => $variant?->id,
                    'sku' => $variant?->sku ?? $product->sku,
                    'product_name' => $product->name,
                    'variant_name' => $variant?->name,
                    'quantity' => $item->quantity,
                    'unit_price' => Money::decimal($unit),
                    'discount_amount' => '0.00',
                    'total' => Money::decimal($total),
                ]);

                // Reserve inventory
                if ($variant) {
                    $this->inventory->reserveVariant($variant, $item->quantity, $order);
                }
            }

            // Clear cart
            $cart->items()->delete();
            $cart->update(['status' => CartStatus::Converted]);

            return $order->load('items');
        });
    }

    public function transition(Order $order, OrderStatus $to): Order
    {
        $allowed = [
            OrderStatus::Pending->value => [OrderStatus::Confirmed, OrderStatus::Cancelled],
            OrderStatus::Confirmed->value => [OrderStatus::Processing, OrderStatus::Cancelled],
            OrderStatus::Processing->value => [OrderStatus::Shipped, OrderStatus::Cancelled],
            OrderStatus::Shipped->value => [OrderStatus::Completed],
            OrderStatus::Completed->value => [],
            OrderStatus::Cancelled->value => [],
        ];

        if (!in_array($to, $allowed[$order->status->value], true)) {
            throw new InvalidOrderStatusTransitionException(
                "Cannot transition {$order->status->value} to {$to->value}."
            );
        }

        $order->update(['status' => $to]);
        return $order->refresh();
    }

    public function cancel(Order $order): Order
    {
        return DB::transaction(function () use ($order) {
            $order = Order::query()->lockForUpdate()->findOrFail($order->id);
            $this->transition($order, OrderStatus::Cancelled);

            // Release inventory
            $type = $order->getMorphClass();
            $movements = \App\Models\StockMovement::query()
                ->where('reference_type', $type)
                ->where('reference_id', $order->id)
                ->where('movement_type', 'sale')
                ->get();

            foreach ($movements as $movement) {
                $this->inventory->release($movement->inventory, abs($movement->quantity), $order);
            }

            return $order;
        });
    }

    private function number(): string
    {
        do {
            $number = 'MQF-' . now()->format('Ymd') . '-' . Str::upper(Str::random(8));
        } while (Order::query()->where('order_number', $number)->exists());

        return $number;
    }

    private function snapshot(string $prefix, Address $a): array
    {
        return [
            "{$prefix}_first_name" => $a->first_name,
            "{$prefix}_last_name" => $a->last_name,
            "{$prefix}_company" => $a->company,
            "{$prefix}_phone" => $a->phone,
            "{$prefix}_address_line_1" => $a->address_line_1,
            "{$prefix}_address_line_2" => $a->address_line_2,
            "{$prefix}_city" => $a->city,
            "{$prefix}_state" => $a->state,
            "{$prefix}_postal_code" => $a->postal_code,
            "{$prefix}_country" => $a->country,
        ];
    }
}
