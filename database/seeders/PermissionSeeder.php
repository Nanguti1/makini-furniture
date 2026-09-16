<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            // Dashboard
            'view dashboard',

            // Catalog - Brands
            'view brands',
            'create brands',
            'edit brands',
            'delete brands',
            'restore brands',

            // Catalog - Categories
            'view categories',
            'create categories',
            'edit categories',
            'delete categories',
            'restore categories',

            // Catalog - Collections
            'view collections',
            'create collections',
            'edit collections',
            'delete collections',
            'restore collections',

            // Catalog - Product Families
            'view product families',
            'create product families',
            'edit product families',
            'delete product families',
            'restore product families',

            // Catalog - Products
            'view products',
            'create products',
            'edit products',
            'delete products',
            'publish products',
            'unpublish products',

            // Merchandising - Banners
            'view banners',
            'create banners',
            'edit banners',
            'delete banners',
            'activate banners',
            'deactivate banners',
            'reorder banners',

            // Merchandising - Lookbooks
            'view lookbooks',
            'create lookbooks',
            'edit lookbooks',
            'delete lookbooks',
            'publish lookbooks',
            'unpublish lookbooks',
            'manage lookbook items',

            // Merchandising - Featured Products
            'view featured products',
            'create featured products',
            'edit featured products',
            'delete featured products',
            'reorder featured products',

            // Merchandising - Featured Collections
            'view featured collections',
            'create featured collections',
            'edit featured collections',
            'delete featured collections',
            'reorder featured collections',

            // CMS - Pages
            'view pages',
            'create pages',
            'edit pages',
            'delete pages',
            'publish pages',
            'unpublish pages',
            'manage page sections',

            // CMS - FAQs
            'view faqs',
            'create faqs',
            'edit faqs',
            'delete faqs',
            'activate faqs',
            'deactivate faqs',
            'reorder faqs',

            // Orders
            'view orders',
            'edit orders',
            'cancel orders',

            // Customers
            'view customers',
            'view customer details',

            // Users
            'view users',
            'create users',
            'edit users',
            'delete users',

            // Settings
            'view settings',
            'edit settings',

            // Role & Permission Management
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',
            'view permissions',
            'create permissions',
            'edit permissions',
            'delete permissions',
            'assign roles',
            'assign permissions',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(
                ['name' => $permission],
                ['guard_name' => 'web']
            );
        }

        $this->command->info('Permissions seeded successfully.');
    }
}