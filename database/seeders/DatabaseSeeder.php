<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Core data (no dependencies)
        $this->call([
            BrandSeeder::class,
            CategorySeeder::class,
            MaterialSeeder::class,
            FinishSeeder::class,
            ColorSeeder::class,
            WarehouseSeeder::class,
            UserSeeder::class,
            SettingsSeeder::class,
        ]);

        // Content data (can run after core data)
        $this->call([
            BannerSeeder::class,
            PageSeeder::class,
            FAQSeeder::class,
        ]);

        // Product data (depends on core data)
        $this->call([
            ProductSeeder::class,
        ]);
    }
}
