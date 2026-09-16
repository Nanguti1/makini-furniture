<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\Price;
use App\Models\Inventory;
use App\Models\Warehouse;
use App\Models\Material;
use App\Models\Color;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $brand = Brand::where('slug', 'makini-queens')->first();
        $livingRoom = Category::where('slug', 'living-room')->first();
        $sofas = Category::where('slug', 'sofas')->first();
        $bedroom = Category::where('slug', 'bedroom')->first();
        $diningRoom = Category::where('slug', 'dining-room')->first();
        $tables = Category::where('slug', 'tables')->first();
        $chairs = Category::where('slug', 'chairs')->first();
        $warehouse = Warehouse::where('code', 'MKQ-MAIN')->first();
        $cedar = Material::where('slug', 'cedar-wood')->first();
        $mahogany = Material::where('slug', 'mahogany')->first();
        $kikoy = Material::where('slug', 'kikoy-fabric')->first();
        $kitenge = Material::where('slug', 'kitenge-fabric')->first();
        $naturalWood = Color::where('slug', 'natural-wood')->first();
        $kikoyRed = Color::where('slug', 'kikoy-red')->first();

        // Products
        $products = [
            [
                'name' => 'Nairobi Classic Sofa',
                'slug' => 'nairobi-classic-sofa',
                'sku' => 'MQ-SF-001',
                'short_description' => 'Handcrafted Kenyan sofa with premium cedar wood frame',
                'description' => 'The Nairobi Classic Sofa embodies Kenyan craftsmanship with its solid cedar wood frame and premium upholstery. Each piece is handcrafted by our skilled artisans at our Eastern Bypass workshop, ensuring exceptional quality and comfort.',
                'status' => 'active',
                'is_featured' => true,
                'is_new' => false,
                'is_bestseller' => true,
                'is_active' => true,
                'category_id' => $sofas->id,
                'brand_id' => $brand->id,
                'variants' => [
                    [
                        'name' => '3-Seater - Kikoy Red',
                        'sku' => 'MQ-SF-001-3K',
                        'price' => 45000,
                        'stock' => 15,
                        'color' => $kikoyRed,
                        'material' => $kikoy,
                    ],
                    [
                        'name' => '3-Seater - Natural Wood',
                        'sku' => 'MQ-SF-001-3N',
                        'price' => 42000,
                        'stock' => 20,
                        'color' => $naturalWood,
                        'material' => $cedar,
                    ],
                    [
                        'name' => '2-Seater - Kikoy Red',
                        'sku' => 'MQ-SF-001-2K',
                        'price' => 35000,
                        'stock' => 12,
                        'color' => $kikoyRed,
                        'material' => $kikoy,
                    ],
                ],
                'images' => [
                    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&h=600&fit=crop',
                ],
            ],
            [
                'name' => 'Savanna Dining Table',
                'slug' => 'savanna-dining-table',
                'sku' => 'MQ-DT-001',
                'short_description' => 'Solid mahogany dining table for 6 people',
                'description' => 'The Savanna Dining Table is crafted from premium Kenyan mahogany, featuring a beautiful natural finish that highlights the wood grain. Perfect for family gatherings and entertaining, this table seats 6 people comfortably.',
                'status' => 'active',
                'is_featured' => true,
                'is_new' => false,
                'is_bestseller' => true,
                'is_active' => true,
                'category_id' => $tables->id,
                'brand_id' => $brand->id,
                'variants' => [
                    [
                        'name' => '6-Seater - Mahogany',
                        'sku' => 'MQ-DT-001-6M',
                        'price' => 65000,
                        'stock' => 8,
                        'color' => $naturalWood,
                        'material' => $mahogany,
                    ],
                ],
                'images' => [
                    'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&h=600&fit=crop',
                ],
            ],
            [
                'name' => 'Kamakisi Bed Frame',
                'slug' => 'kamakisi-bed-frame',
                'sku' => 'MQ-BD-001',
                'short_description' => 'Solid cedar wood king-size bed frame',
                'description' => 'The Kamakisi Bed Frame is named after our location and represents the pinnacle of Kenyan bedroom furniture. Crafted from solid cedar wood with a natural finish, this king-size bed frame combines durability with elegant design.',
                'status' => 'active',
                'is_featured' => true,
                'is_new' => true,
                'is_bestseller' => false,
                'is_active' => true,
                'category_id' => $bedroom->id,
                'brand_id' => $brand->id,
                'variants' => [
                    [
                        'name' => 'King Size - Cedar',
                        'sku' => 'MQ-BD-001-KC',
                        'price' => 55000,
                        'stock' => 10,
                        'color' => $naturalWood,
                        'material' => $cedar,
                    ],
                    [
                        'name' => 'Queen Size - Cedar',
                        'sku' => 'MQ-BD-001-QC',
                        'price' => 48000,
                        'stock' => 15,
                        'color' => $naturalWood,
                        'material' => $cedar,
                    ],
                ],
                'images' => [
                    'https://images.unsplash.com/photo-1616594039964-40891a909304?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
                ],
            ],
            [
                'name' => 'Eastern Bypass Office Chair',
                'slug' => 'eastern-bypass-office-chair',
                'sku' => 'MQ-OC-001',
                'short_description' => 'Ergonomic office chair with kitenge fabric',
                'description' => 'The Eastern Bypass Office Chair combines ergonomic design with vibrant Kenyan kitenge fabric. Perfect for home offices, this chair provides comfort during long work hours while adding a touch of Kenyan style to your workspace.',
                'status' => 'active',
                'is_featured' => false,
                'is_new' => true,
                'is_bestseller' => false,
                'is_active' => true,
                'category_id' => $chairs->id,
                'brand_id' => $brand->id,
                'variants' => [
                    [
                        'name' => 'Standard - Kitenge',
                        'sku' => 'MQ-OC-001-SK',
                        'price' => 18000,
                        'stock' => 25,
                        'color' => $kikoyRed,
                        'material' => $kitenge,
                    ],
                ],
                'images' => [
                    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
                ],
            ],
            [
                'name' => 'Rift Valley Coffee Table',
                'slug' => 'rift-valley-coffee-table',
                'sku' => 'MQ-CT-001',
                'short_description' => 'Solid cedar wood coffee table with natural finish',
                'description' => 'Inspired by the natural beauty of Kenya\'s Rift Valley, this coffee table features solid cedar wood construction with a stunning natural finish. The clean lines and sturdy construction make it a perfect centerpiece for any living room.',
                'status' => 'active',
                'is_featured' => true,
                'is_new' => false,
                'is_bestseller' => true,
                'is_active' => true,
                'category_id' => $tables->id,
                'brand_id' => $brand->id,
                'variants' => [
                    [
                        'name' => 'Standard - Cedar',
                        'sku' => 'MQ-CT-001-SC',
                        'price' => 22000,
                        'stock' => 18,
                        'color' => $naturalWood,
                        'material' => $cedar,
                    ],
                ],
                'images' => [
                    'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop',
                ],
            ],
            [
                'name' => 'Nairobi Lounge Chair',
                'slug' => 'nairobi-lounge-chair',
                'sku' => 'MQ-LC-001',
                'short_description' => 'Comfortable lounge chair with kikoy fabric',
                'description' => 'The Nairobi Lounge Chair offers ultimate comfort with traditional Kenyan kikoy fabric upholstery. The solid cedar frame provides durability while the cushioned seat and back ensure relaxation after a long day.',
                'status' => 'active',
                'is_featured' => false,
                'is_new' => true,
                'is_bestseller' => false,
                'is_active' => true,
                'category_id' => $chairs->id,
                'brand_id' => $brand->id,
                'variants' => [
                    [
                        'name' => 'Standard - Kikoy Red',
                        'sku' => 'MQ-LC-001-SK',
                        'price' => 28000,
                        'stock' => 12,
                        'color' => $kikoyRed,
                        'material' => $kikoy,
                    ],
                    [
                        'name' => 'Standard - Natural Wood',
                        'sku' => 'MQ-LC-001-SN',
                        'price' => 25000,
                        'stock' => 15,
                        'color' => $naturalWood,
                        'material' => $cedar,
                    ],
                ],
                'images' => [
                    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&h=600&fit=crop',
                ],
            ],
        ];

        foreach ($products as $productData) {
            DB::beginTransaction();
            try {
                $variants = $productData['variants'];
                $images = $productData['images'];
                unset($productData['variants'], $productData['images']);

                $product = Product::create($productData);

                // Create variants
                foreach ($variants as $index => $variantData) {
                    $color = $variantData['color'];
                    $material = $variantData['material'];
                    $stock = $variantData['stock'];
                    $price = $variantData['price'];
                    unset($variantData['color'], $variantData['material'], $variantData['stock'], $variantData['price']);

                    $variant = ProductVariant::create(array_merge($variantData, [
                        'product_id' => $product->id,
                        'status' => 'active',
                        'is_default' => $index === 0,
                        'is_active' => true,
                    ]));

                    // Attach color to variant
                    if ($color) {
                        $variant->colors()->attach($color->id);
                    }

                    // Create price
                    Price::create([
                        'product_id' => $product->id,
                        'product_variant_id' => $variant->id,
                        'amount' => $price,
                        'currency' => 'KES',
                        'price_type' => 'retail',
                        'is_active' => true,
                    ]);

                    // Create inventory
                    Inventory::create([
                        'warehouse_id' => $warehouse->id,
                        'product_variant_id' => $variant->id,
                        'quantity_on_hand' => $stock,
                        'quantity_reserved' => 0,
                        'reorder_level' => 5,
                    ]);
                }

                // Attach materials to product (not variant)
                $uniqueMaterials = collect($variants)->pluck('material')->unique()->filter();
                foreach ($uniqueMaterials as $material) {
                    if ($material) {
                        $product->materials()->attach($material->id);
                    }
                }

                // Create images
                foreach ($images as $index => $imageUrl) {
                    ProductImage::create([
                        'product_id' => $product->id,
                        'path' => $imageUrl,
                        'alt_text' => $product->name,
                        'title' => $product->name,
                        'type' => 'gallery',
                        'sort_order' => $index,
                        'is_primary' => $index === 0,
                    ]);
                }

                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                $this->command->error("Error creating product {$productData['name']}: " . $e->getMessage());
            }
        }
    }
}