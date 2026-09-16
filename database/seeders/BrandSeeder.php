<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        Brand::create([
            'name' => 'Makini Queens',
            'slug' => 'makini-queens',
            'description' => 'Premium Kenyan furniture manufacturer specializing in handcrafted pieces for modern homes',
            'short_description' => 'Premium Kenyan handcrafted furniture',
            'logo' => 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=200&h=200&fit=crop',
            'cover_image' => 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=400&fit=crop',
            'meta_title' => 'Makini Queens - Premium Kenyan Furniture',
            'meta_description' => 'Shop premium handcrafted furniture from Makini Queens, Kenya\'s leading furniture manufacturer',
            'is_active' => true,
            'sort_order' => 1,
        ]);
    }
}