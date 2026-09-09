<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductVariantFactory extends Factory
{
    protected $model = ProductVariant::class;

    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'sku' => $this->faker->unique()->bothify('VAR-????-####'),
            'name' => $this->faker->word,
            'barcode' => $this->faker->unique()->ean13,
            'price_override' => $this->faker->randomFloat(2, 1000, 50000),
            'cost_price' => $this->faker->randomFloat(2, 500, 25000),
            'weight' => $this->faker->randomFloat(2, 1, 100),
            'weight_unit' => 'kg',
            'status' => 'active',
            'is_default' => false,
            'is_active' => true,
        ];
    }
}
