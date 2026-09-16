<?php

namespace Database\Seeders;

use App\Models\Material;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    public function run(): void
    {
        $materials = [
            [
                'name' => 'Cedar Wood',
                'slug' => 'cedar-wood',
                'description' => 'Premium Kenyan cedar wood, naturally resistant to decay and insects',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Mahogany',
                'slug' => 'mahogany',
                'description' => 'Rich, durable mahogany wood with beautiful grain patterns',
                'image' => 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Teak',
                'slug' => 'teak',
                'description' => 'Weather-resistant teak perfect for Kenyan outdoor furniture',
                'image' => 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Pine',
                'slug' => 'pine',
                'description' => 'Affordable, versatile pine wood for everyday furniture',
                'image' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Leather',
                'slug' => 'leather',
                'description' => 'Premium genuine leather upholstery',
                'image' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Cotton Fabric',
                'slug' => 'cotton-fabric',
                'description' => 'Breathable cotton fabric in various Kenyan patterns',
                'image' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'name' => 'Kikoy Fabric',
                'slug' => 'kikoy-fabric',
                'description' => 'Traditional Kenyan kikoy fabric for authentic local styling',
                'image' => 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'name' => 'Kitenge Fabric',
                'slug' => 'kitenge-fabric',
                'description' => 'Vibrant Kenyan kitenge fabric for bold furniture statements',
                'image' => 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 8,
            ],
            [
                'name' => 'Metal',
                'slug' => 'metal',
                'description' => 'Durable metal frames and accents',
                'image' => 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 9,
            ],
            [
                'name' => 'Rattan',
                'slug' => 'rattan',
                'description' => 'Natural rattan for tropical furniture pieces',
                'image' => 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 10,
            ],
        ];

        foreach ($materials as $material) {
            Material::create($material);
        }
    }
}