<?php

namespace Tests\Feature;

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class PermissionSystemTest extends TestCase
{

    public function test_permission_system_is_configured()
    {
        // Run migrations
        $this->artisan('migrate');

        // Run seeders
        $this->seed(\Database\Seeders\RoleSeeder::class);
        $this->seed(\Database\Seeders\PermissionSeeder::class);
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);

        // Verify roles exist
        $this->assertDatabaseHas('roles', ['name' => 'Super Admin']);
        $this->assertDatabaseHas('roles', ['name' => 'Admin']);
        $this->assertDatabaseHas('roles', ['name' => 'Manager']);
        $this->assertDatabaseHas('roles', ['name' => 'Customer']);

        // Verify permissions exist
        $this->assertDatabaseHas('permissions', ['name' => 'view dashboard']);
        $this->assertDatabaseHas('permissions', ['name' => 'view roles']);
        $this->assertDatabaseHas('permissions', ['name' => 'create roles']);
    }

    public function test_super_admin_has_all_permissions()
    {
        $this->artisan('migrate');
        $this->seed(\Database\Seeders\RoleSeeder::class);
        $this->seed(\Database\Seeders\PermissionSeeder::class);
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);

        $superAdmin = Role::where('name', 'Super Admin')->first();
        $user = User::factory()->create();
        $user->assignRole('Super Admin');

        $this->assertTrue($user->hasRole('Super Admin'));
        $this->assertTrue($user->can('view dashboard'));
        $this->assertTrue($user->can('view roles'));
        $this->assertTrue($user->can('create roles'));
    }

    public function test_admin_has_role_management_permissions()
    {
        $this->artisan('migrate');
        $this->seed(\Database\Seeders\RoleSeeder::class);
        $this->seed(\Database\Seeders\PermissionSeeder::class);
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);

        $admin = Role::where('name', 'Admin')->first();
        $user = User::factory()->create();
        $user->assignRole('Admin');

        $this->assertTrue($user->hasRole('Admin'));
        $this->assertTrue($user->can('view roles'));
        $this->assertTrue($user->can('create roles'));
        $this->assertTrue($user->can('edit roles'));
    }

    public function test_manager_has_limited_permissions()
    {
        $this->artisan('migrate');
        $this->seed(\Database\Seeders\RoleSeeder::class);
        $this->seed(\Database\Seeders\PermissionSeeder::class);
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);

        $manager = Role::where('name', 'Manager')->first();
        $user = User::factory()->create();
        $user->assignRole('Manager');

        $this->assertTrue($user->hasRole('Manager'));
        $this->assertTrue($user->can('view dashboard'));
        $this->assertTrue($user->can('view products'));
        $this->assertFalse($user->can('view roles'));
        $this->assertFalse($user->can('create roles'));
    }

    public function test_customer_has_minimal_permissions()
    {
        $this->artisan('migrate');
        $this->seed(\Database\Seeders\RoleSeeder::class);
        $this->seed(\Database\Seeders\PermissionSeeder::class);
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);

        $customer = Role::where('name', 'Customer')->first();
        $user = User::factory()->create();
        $user->assignRole('Customer');

        $this->assertTrue($user->hasRole('Customer'));
        $this->assertTrue($user->can('view dashboard'));
        $this->assertFalse($user->can('view products'));
        $this->assertFalse($user->can('view roles'));
    }

    public function test_roles_index_requires_permission()
    {
        $this->artisan('migrate');
        $this->seed(\Database\Seeders\RoleSeeder::class);
        $this->seed(\Database\Seeders\PermissionSeeder::class);
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);

        $user = User::factory()->create();
        $user->assignRole('Customer');

        $response = $this->actingAs($user)
            ->get(route('admin.roles.index'));

        $response->assertStatus(403);
    }

    public function test_roles_index_allowed_with_permission()
    {
        $this->artisan('migrate');
        $this->seed(\Database\Seeders\RoleSeeder::class);
        $this->seed(\Database\Seeders\PermissionSeeder::class);
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);

        $user = User::factory()->create();
        $user->assignRole('Admin');

        $response = $this->actingAs($user)
            ->get(route('admin.roles.index'));

        $response->assertStatus(200);
    }

    public function test_permissions_index_requires_permission()
    {
        $this->artisan('migrate');
        $this->seed(\Database\Seeders\RoleSeeder::class);
        $this->seed(\Database\Seeders\PermissionSeeder::class);
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);

        $user = User::factory()->create();
        $user->assignRole('Customer');

        $response = $this->actingAs($user)
            ->get(route('admin.permissions.index'));

        $response->assertStatus(403);
    }

    public function test_permissions_index_allowed_with_permission()
    {
        $this->artisan('migrate');
        $this->seed(\Database\Seeders\RoleSeeder::class);
        $this->seed(\Database\Seeders\PermissionSeeder::class);
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);

        $user = User::factory()->create();
        $user->assignRole('Admin');

        $response = $this->actingAs($user)
            ->get(route('admin.permissions.index'));

        $response->assertStatus(200);
    }
}