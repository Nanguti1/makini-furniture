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
            SettingsSeeder::class,
        ]);

        // Permission system (must be before UserSeeder)
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            RolePermissionSeeder::class,
        ]);

        // Users (depends on roles and permissions)
        $this->call([
            UserSeeder::class,
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
