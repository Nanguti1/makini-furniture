<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderItemFactory extends Factory
{
    protected $model = OrderItem::class;

    public function definition(): array
    {
        return [
            'order_id' => Order::factory(),
            'product_id' => Product::factory(),
            'product_variant_id' => ProductVariant::factory(),
            'sku' => $this->faker->unique()->bothify('SKU-????-####'),
            'product_name' => $this->faker->words(3, true),
            'variant_name' => $this->faker->word,
            'quantity' => $this->faker->numberBetween(1, 5),
            'unit_price' => $this->faker->randomFloat(2, 1000, 50000),
            'discount_amount' => 0,
            'total' => $this->faker->randomFloat(2, 1000, 100000),
            'metadata' => null,
        ];
    }
}
