<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    public function run(): void
    {
        $colors = [
            [
                'name' => 'Natural Wood',
                'slug' => 'natural-wood',
                'hex_code' => '#8B4513',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Black',
                'slug' => 'black',
                'hex_code' => '#000000',
                'image' => 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'White',
                'slug' => 'white',
                'hex_code' => '#FFFFFF',
                'image' => 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Navy Blue',
                'slug' => 'navy-blue',
                'hex_code' => '#000080',
                'image' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Earth Brown',
                'slug' => 'earth-brown',
                'hex_code' => '#5D4037',
                'image' => 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Savanna Beige',
                'slug' => 'savanna-beige',
                'hex_code' => '#F5F5DC',
                'image' => 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'name' => 'Sunset Orange',
                'slug' => 'sunset-orange',
                'hex_code' => '#FF4500',
                'image' => 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'name' => 'Kikoy Red',
                'slug' => 'kikoy-red',
                'hex_code' => '#DC143C',
                'image' => 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 8,
            ],
            [
                'name' => 'Forest Green',
                'slug' => 'forest-green',
                'hex_code' => '#228B22',
                'image' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 9,
            ],
            [
                'name' => 'Grey',
                'slug' => 'grey',
                'hex_code' => '#808080',
                'image' => 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 10,
            ],
        ];

        foreach ($colors as $color) {
            Color::create($color);
        }
    }
}