<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'order_number' => 'ORD-' . $this->faker->unique()->randomNumber(8),
            'status' => 'completed',
            'currency' => 'KES',
            'subtotal' => $this->faker->randomFloat(2, 1000, 100000),
            'discount_total' => 0,
            'shipping_total' => $this->faker->randomFloat(2, 500, 5000),
            'tax_total' => $this->faker->randomFloat(2, 100, 10000),
            'grand_total' => $this->faker->randomFloat(2, 2000, 150000),
            'billing_first_name' => $this->faker->firstName,
            'billing_last_name' => $this->faker->lastName,
            'billing_company' => $this->faker->company,
            'billing_phone' => $this->faker->phoneNumber,
            'billing_address_line_1' => $this->faker->streetAddress,
            'billing_address_line_2' => $this->faker->secondaryAddress,
            'billing_city' => $this->faker->city,
            'billing_state' => $this->faker->state,
            'billing_postal_code' => $this->faker->postcode,
            'billing_country' => 'KE',
            'shipping_first_name' => $this->faker->firstName,
            'shipping_last_name' => $this->faker->lastName,
            'shipping_company' => $this->faker->company,
            'shipping_phone' => $this->faker->phoneNumber,
            'shipping_address_line_1' => $this->faker->streetAddress,
            'shipping_address_line_2' => $this->faker->secondaryAddress,
            'shipping_city' => $this->faker->city,
            'shipping_state' => $this->faker->state,
            'shipping_postal_code' => $this->faker->postcode,
            'shipping_country' => 'KE',
        ];
    }
}
