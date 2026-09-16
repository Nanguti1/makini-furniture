<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    public function run(): void
    {
        $banners = [
            [
                'title' => 'Premium Kenyan Craftsmanship',
                'subtitle' => 'Handcrafted furniture made with love in Kenya',
                'image' => 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&h=600&fit=crop',
                'mobile_image' => 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=1200&fit=crop',
                'link' => '/catalog',
                'link_type' => 'catalog',
                'placement' => 'home_hero',
                'starts_at' => now()->subDays(7),
                'ends_at' => now()->addDays(30),
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'New Collection Launch',
                'subtitle' => 'Discover our latest Kenyan-inspired designs',
                'image' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&h=600&fit=crop',
                'mobile_image' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1200&fit=crop',
                'link' => '/catalog?sort=newest',
                'link_type' => 'catalog',
                'placement' => 'home_secondary',
                'starts_at' => now()->subDays(3),
                'ends_at' => now()->addDays(14),
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Sofa Sale - Up to 30% Off',
                'subtitle' => 'Quality living room furniture at unbeatable prices',
                'image' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&h=600&fit=crop',
                'mobile_image' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1200&fit=crop',
                'link' => '/catalog?category=sofas',
                'link_type' => 'category',
                'placement' => 'home_promo',
                'starts_at' => now()->subDays(1),
                'ends_at' => now()->addDays(7),
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Handcrafted in Kenya',
                'subtitle' => 'Support local artisans, enjoy quality furniture',
                'image' => 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=1920&h=600&fit=crop',
                'mobile_image' => 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&h=1200&fit=crop',
                'link' => '/catalog',
                'link_type' => 'catalog',
                'placement' => 'catalog_top',
                'starts_at' => now()->subDays(10),
                'ends_at' => now()->addDays(20),
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'title' => 'Free Delivery in Nairobi',
                'subtitle' => 'Orders over KES 30,000 delivered free',
                'image' => 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1920&h=600&fit=crop',
                'mobile_image' => 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&h=1200&fit=crop',
                'link' => '/catalog',
                'link_type' => 'catalog',
                'placement' => 'checkout_banner',
                'starts_at' => now()->subDays(5),
                'ends_at' => now()->addDays(25),
                'is_active' => true,
                'sort_order' => 5,
            ],
        ];

        foreach ($banners as $banner) {
            Banner::create($banner);
        }
    }
}