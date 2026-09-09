<?php

namespace Tests\Feature\Account;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use App\Queries\Account\OrderHistoryQuery;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderHistoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_their_orders(): void
    {
        $user = User::factory()->create();
        Order::create([
            'user_id' => $user->id,
            'order_number' => 'ORD-001',
            'status' => 'completed',
            'currency' => 'KES',
            'subtotal' => 1000.00,
            'discount_total' => 0,
            'shipping_total' => 500.00,
            'tax_total' => 160.00,
            'grand_total' => 1660.00,
            'billing_first_name' => 'John',
            'billing_last_name' => 'Doe',
            'billing_phone' => '+254712345678',
            'billing_address_line_1' => '123 Main St',
            'billing_city' => 'Nairobi',
            'billing_state' => 'Nairobi',
            'billing_postal_code' => '00100',
            'billing_country' => 'KE',
            'shipping_first_name' => 'John',
            'shipping_last_name' => 'Doe',
            'shipping_phone' => '+254712345678',
            'shipping_address_line_1' => '123 Main St',
            'shipping_city' => 'Nairobi',
            'shipping_state' => 'Nairobi',
            'shipping_postal_code' => '00100',
            'shipping_country' => 'KE',
        ]);

        $this->assertEquals(1, $user->orders()->count());
    }

    public function test_user_can_view_specific_order(): void
    {
        $user = User::factory()->create();
        $order = Order::create([
            'user_id' => $user->id,
            'order_number' => 'ORD-001',
            'status' => 'completed',
            'currency' => 'KES',
            'subtotal' => 1000.00,
            'discount_total' => 0,
            'shipping_total' => 500.00,
            'tax_total' => 160.00,
            'grand_total' => 1660.00,
            'billing_first_name' => 'John',
            'billing_last_name' => 'Doe',
            'billing_phone' => '+254712345678',
            'billing_address_line_1' => '123 Main St',
            'billing_city' => 'Nairobi',
            'billing_state' => 'Nairobi',
            'billing_postal_code' => '00100',
            'billing_country' => 'KE',
            'shipping_first_name' => 'John',
            'shipping_last_name' => 'Doe',
            'shipping_phone' => '+254712345678',
            'shipping_address_line_1' => '123 Main St',
            'shipping_city' => 'Nairobi',
            'shipping_state' => 'Nairobi',
            'shipping_postal_code' => '00100',
            'shipping_country' => 'KE',
        ]);

        $query = app(OrderHistoryQuery::class);
        $result = $query->findForUser($user, $order->id);

        $this->assertNotNull($result);
        $this->assertEquals($order->id, $result->id);
    }

    public function test_user_cannot_view_other_users_orders(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $order = Order::create([
            'user_id' => $otherUser->id,
            'order_number' => 'ORD-001',
            'status' => 'completed',
            'currency' => 'KES',
            'subtotal' => 1000.00,
            'discount_total' => 0,
            'shipping_total' => 500.00,
            'tax_total' => 160.00,
            'grand_total' => 1660.00,
            'billing_first_name' => 'John',
            'billing_last_name' => 'Doe',
            'billing_phone' => '+254712345678',
            'billing_address_line_1' => '123 Main St',
            'billing_city' => 'Nairobi',
            'billing_state' => 'Nairobi',
            'billing_postal_code' => '00100',
            'billing_country' => 'KE',
            'shipping_first_name' => 'John',
            'shipping_last_name' => 'Doe',
            'shipping_phone' => '+254712345678',
            'shipping_address_line_1' => '123 Main St',
            'shipping_city' => 'Nairobi',
            'shipping_state' => 'Nairobi',
            'shipping_postal_code' => '00100',
            'shipping_country' => 'KE',
        ]);

        $query = app(OrderHistoryQuery::class);
        $result = $query->findForUser($user, $order->id);

        $this->assertNull($result);
    }

    public function test_order_history_query_returns_only_user_orders(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        $userOrder = Order::create([
            'user_id' => $user->id,
            'order_number' => 'ORD-001',
            'status' => 'completed',
            'currency' => 'KES',
            'subtotal' => 1000.00,
            'discount_total' => 0,
            'shipping_total' => 500.00,
            'tax_total' => 160.00,
            'grand_total' => 1660.00,
            'billing_first_name' => 'John',
            'billing_last_name' => 'Doe',
            'billing_phone' => '+254712345678',
            'billing_address_line_1' => '123 Main St',
            'billing_city' => 'Nairobi',
            'billing_state' => 'Nairobi',
            'billing_postal_code' => '00100',
            'billing_country' => 'KE',
            'shipping_first_name' => 'John',
            'shipping_last_name' => 'Doe',
            'shipping_phone' => '+254712345678',
            'shipping_address_line_1' => '123 Main St',
            'shipping_city' => 'Nairobi',
            'shipping_state' => 'Nairobi',
            'shipping_postal_code' => '00100',
            'shipping_country' => 'KE',
        ]);

        $otherUserOrder = Order::create([
            'user_id' => $otherUser->id,
            'order_number' => 'ORD-002',
            'status' => 'completed',
            'currency' => 'KES',
            'subtotal' => 2000.00,
            'discount_total' => 0,
            'shipping_total' => 500.00,
            'tax_total' => 320.00,
            'grand_total' => 2820.00,
            'billing_first_name' => 'Jane',
            'billing_last_name' => 'Smith',
            'billing_phone' => '+254798765432',
            'billing_address_line_1' => '456 Other St',
            'billing_city' => 'Mombasa',
            'billing_state' => 'Mombasa',
            'billing_postal_code' => '80100',
            'billing_country' => 'KE',
            'shipping_first_name' => 'Jane',
            'shipping_last_name' => 'Smith',
            'shipping_phone' => '+254798765432',
            'shipping_address_line_1' => '456 Other St',
            'shipping_city' => 'Mombasa',
            'shipping_state' => 'Mombasa',
            'shipping_postal_code' => '80100',
            'shipping_country' => 'KE',
        ]);

        $query = app(OrderHistoryQuery::class);
        $orders = $query->paginate($user, 15);

        $this->assertCount(1, $orders);
        $this->assertEquals($userOrder->id, $orders->first()->id);
    }

    public function test_order_history_query_includes_order_items(): void
    {
        $user = User::factory()->create();
        $order = Order::create([
            'user_id' => $user->id,
            'order_number' => 'ORD-001',
            'status' => 'completed',
            'currency' => 'KES',
            'subtotal' => 1000.00,
            'discount_total' => 0,
            'shipping_total' => 500.00,
            'tax_total' => 160.00,
            'grand_total' => 1660.00,
            'billing_first_name' => 'John',
            'billing_last_name' => 'Doe',
            'billing_phone' => '+254712345678',
            'billing_address_line_1' => '123 Main St',
            'billing_city' => 'Nairobi',
            'billing_state' => 'Nairobi',
            'billing_postal_code' => '00100',
            'billing_country' => 'KE',
            'shipping_first_name' => 'John',
            'shipping_last_name' => 'Doe',
            'shipping_phone' => '+254712345678',
            'shipping_address_line_1' => '123 Main St',
            'shipping_city' => 'Nairobi',
            'shipping_state' => 'Nairobi',
            'shipping_postal_code' => '00100',
            'shipping_country' => 'KE',
        ]);

        $brand = \App\Models\Brand::create(['name' => 'Test Brand', 'slug' => 'test-brand']);
        $category = \App\Models\Category::create(['name' => 'Test Category', 'slug' => 'test-category']);

        $product = Product::create([
            'brand_id' => $brand->id,
            'category_id' => $category->id,
            'name' => 'Test Product',
            'slug' => 'test-product',
            'sku' => 'TEST-001',
            'status' => 'published',
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product->id,
            'sku' => 'SKU-001',
            'product_name' => 'Test Product',
            'quantity' => 1,
            'unit_price' => 1000.00,
            'discount_amount' => 0,
            'total' => 1000.00,
        ]);

        $query = app(OrderHistoryQuery::class);
        $result = $query->findForUser($user, $order->id);

        $this->assertNotNull($result);
        $this->assertCount(1, $result->items);
        $this->assertEquals($product->id, $result->items->first()->product_id);
    }

    public function test_order_history_query_returns_null_for_non_existent_order(): void
    {
        $user = User::factory()->create();

        $query = app(OrderHistoryQuery::class);
        $result = $query->findForUser($user, 999);

        $this->assertNull($result);
    }

    public function test_order_history_query_returns_null_for_other_users_order(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $order = Order::create([
            'user_id' => $otherUser->id,
            'order_number' => 'ORD-001',
            'status' => 'completed',
            'currency' => 'KES',
            'subtotal' => 1000.00,
            'discount_total' => 0,
            'shipping_total' => 500.00,
            'tax_total' => 160.00,
            'grand_total' => 1660.00,
            'billing_first_name' => 'John',
            'billing_last_name' => 'Doe',
            'billing_phone' => '+254712345678',
            'billing_address_line_1' => '123 Main St',
            'billing_city' => 'Nairobi',
            'billing_state' => 'Nairobi',
            'billing_postal_code' => '00100',
            'billing_country' => 'KE',
            'shipping_first_name' => 'John',
            'shipping_last_name' => 'Doe',
            'shipping_phone' => '+254712345678',
            'shipping_address_line_1' => '123 Main St',
            'shipping_city' => 'Nairobi',
            'shipping_state' => 'Nairobi',
            'shipping_postal_code' => '00100',
            'shipping_country' => 'KE',
        ]);

        $query = app(OrderHistoryQuery::class);
        $result = $query->findForUser($user, $order->id);

        $this->assertNull($result);
    }

    public function test_orders_are_paginated(): void
    {
        $user = User::factory()->create();

        for ($i = 0; $i < 20; $i++) {
            Order::create([
                'user_id' => $user->id,
                'order_number' => 'ORD-' . str_pad($i + 1, 3, '0', STR_PAD_LEFT),
                'status' => 'completed',
                'currency' => 'KES',
                'subtotal' => 1000.00,
                'discount_total' => 0,
                'shipping_total' => 500.00,
                'tax_total' => 160.00,
                'grand_total' => 1660.00,
                'billing_first_name' => 'John',
                'billing_last_name' => 'Doe',
                'billing_phone' => '+254712345678',
                'billing_address_line_1' => '123 Main St',
                'billing_city' => 'Nairobi',
                'billing_state' => 'Nairobi',
                'billing_postal_code' => '00100',
                'billing_country' => 'KE',
                'shipping_first_name' => 'John',
                'shipping_last_name' => 'Doe',
                'shipping_phone' => '+254712345678',
                'shipping_address_line_1' => '123 Main St',
                'shipping_city' => 'Nairobi',
                'shipping_state' => 'Nairobi',
                'shipping_postal_code' => '00100',
                'shipping_country' => 'KE',
            ]);
        }

        $query = app(OrderHistoryQuery::class);
        $orders = $query->paginate($user, 10);

        $this->assertCount(10, $orders);
        $this->assertEquals(10, $orders->perPage());
    }
}
