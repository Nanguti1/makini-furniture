<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all roles
        $superAdmin = Role::where('name', 'Super Admin')->first();
        $admin = Role::where('name', 'Admin')->first();
        $manager = Role::where('name', 'Manager')->first();
        $customer = Role::where('name', 'Customer')->first();

        // Get all permissions
        $allPermissions = Permission::all();

        // Super Admin gets all permissions
        if ($superAdmin) {
            $superAdmin->syncPermissions($allPermissions);
        }

        // Admin gets most permissions including role/permission management and user management
        if ($admin) {
            $adminPermissions = $allPermissions->filter(function ($permission) {
                return !str_contains($permission->name, 'assign');
            });
            $admin->syncPermissions($adminPermissions);
        }

        // Manager gets catalog and order permissions
        if ($manager) {
            $managerPermissions = Permission::whereIn('name', [
                'view dashboard',
                'view brands', 'create brands', 'edit brands', 'delete brands', 'restore brands',
                'view categories', 'create categories', 'edit categories', 'delete categories', 'restore categories',
                'view collections', 'create collections', 'edit collections', 'delete collections', 'restore collections',
                'view product families', 'create product families', 'edit product families', 'delete product families', 'restore product families',
                'view products', 'create products', 'edit products', 'delete products', 'publish products', 'unpublish products',
                'view orders', 'edit orders',
                'view customers', 'view customer details',
            ])->get();
            $manager->syncPermissions($managerPermissions);
        }

        // Customer gets minimal permissions for their own account
        if ($customer) {
            $customerPermissions = Permission::whereIn('name', [
                'view dashboard',
            ])->get();
            $customer->syncPermissions($customerPermissions);
        }

        $this->command->info('Role permissions seeded successfully.');
    }
}