<?php

namespace Database\Seeders;

use App\Models\Finish;
use Illuminate\Database\Seeder;

class FinishSeeder extends Seeder
{
    public function run(): void
    {
        $finishes = [
            [
                'name' => 'Natural',
                'slug' => 'natural',
                'description' => 'Natural wood finish highlighting the natural grain',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Dark Walnut',
                'slug' => 'dark-walnut',
                'description' => 'Rich dark walnut stain for elegant appearance',
                'image' => 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Oak',
                'slug' => 'oak',
                'description' => 'Classic oak finish with warm tones',
                'image' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Mahogany',
                'slug' => 'mahogany',
                'description' => 'Deep mahogany finish for luxury pieces',
                'image' => 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Painted White',
                'slug' => 'painted-white',
                'description' => 'Clean white painted finish for modern look',
                'image' => 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Matte Black',
                'slug' => 'matte-black',
                'description' => 'Modern matte black finish',
                'image' => 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'name' => 'Chrome',
                'slug' => 'chrome',
                'description' => 'Sleek chrome finish for metal accents',
                'image' => 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'name' => 'Bronze',
                'slug' => 'bronze',
                'description' => 'Antique bronze finish for vintage appeal',
                'image' => 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop',
                'is_active' => true,
                'sort_order' => 8,
            ],
        ];

        foreach ($finishes as $finish) {
            Finish::create($finish);
        }
    }
}