<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Living Room',
                'slug' => 'living-room',
                'description' => 'Comfortable and stylish living room furniture for Kenyan homes',
                'image' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
                'meta_title' => 'Living Room Furniture Kenya',
                'meta_description' => 'Shop living room furniture including sofas, coffee tables, and entertainment units',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Bedroom',
                'slug' => 'bedroom',
                'description' => 'Quality bedroom furniture for restful Kenyan nights',
                'image' => 'https://images.unsplash.com/photo-1616594039964-40891a909304?w=800&h=600&fit=crop',
                'meta_title' => 'Bedroom Furniture Kenya',
                'meta_description' => 'Find beds, wardrobes, and bedroom sets for your Kenyan home',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Dining Room',
                'slug' => 'dining-room',
                'description' => 'Elegant dining furniture for family gatherings and entertaining',
                'image' => 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=600&fit=crop',
                'meta_title' => 'Dining Room Furniture Kenya',
                'meta_description' => 'Dining tables, chairs, and sideboards for Kenyan homes',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Office',
                'slug' => 'office',
                'description' => 'Home office furniture for productive workspaces',
                'image' => 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=600&fit=crop',
                'meta_title' => 'Office Furniture Kenya',
                'meta_description' => 'Desks, chairs, and storage for home offices in Kenya',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Outdoor',
                'slug' => 'outdoor',
                'description' => 'Weather-resistant outdoor furniture for Kenyan patios and gardens',
                'image' => 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop',
                'meta_title' => 'Outdoor Furniture Kenya',
                'meta_description' => 'Patio furniture and outdoor seating for Kenyan weather',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Kitchen',
                'slug' => 'kitchen',
                'description' => 'Functional kitchen furniture and storage solutions',
                'image' => 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
                'meta_title' => 'Kitchen Furniture Kenya',
                'meta_description' => 'Kitchen islands, cabinets, and dining furniture',
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'name' => 'Sofas',
                'slug' => 'sofas',
                'description' => 'Comfortable sofas and couches for every living room',
                'image' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
                'meta_title' => 'Sofas Kenya',
                'meta_description' => 'Shop quality sofas and couches in Kenya',
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'name' => 'Tables',
                'slug' => 'tables',
                'description' => 'Dining tables, coffee tables, and side tables',
                'image' => 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&h=600&fit=crop',
                'meta_title' => 'Tables Kenya',
                'meta_description' => 'Dining, coffee, and side tables for Kenyan homes',
                'is_active' => true,
                'sort_order' => 8,
            ],
            [
                'name' => 'Chairs',
                'slug' => 'chairs',
                'description' => 'Dining chairs, accent chairs, and office chairs',
                'image' => 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
                'meta_title' => 'Chairs Kenya',
                'meta_description' => 'Quality chairs for dining, office, and accent seating',
                'is_active' => true,
                'sort_order' => 9,
            ],
            [
                'name' => 'Storage',
                'slug' => 'storage',
                'description' => 'Wardrobes, cabinets, and shelving solutions',
                'image' => 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop',
                'meta_title' => 'Storage Furniture Kenya',
                'meta_description' => 'Wardrobes, cabinets, and storage solutions',
                'is_active' => true,
                'sort_order' => 10,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}