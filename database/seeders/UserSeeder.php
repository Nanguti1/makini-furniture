<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Super Admin user
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@makiniqueens.co.ke',
            'password' => Hash::make('password'),
        ]);
        $superAdmin->assignRole('Super Admin');

        // Admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@makiniqueens.co.ke',
            'password' => Hash::make('password'),
        ]);
        $admin->assignRole('Admin');

        // Manager user
        $manager = User::create([
            'name' => 'Warehouse Manager',
            'email' => 'manager@makiniqueens.co.ke',
            'password' => Hash::make('password'),
        ]);
        $manager->assignRole('Manager');

        // Sample customers
        $customers = [
            [
                'name' => 'John Kamau',
                'email' => 'john.kamau@gmail.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Mary Wanjiku',
                'email' => 'mary.wanjiku@yahoo.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Peter Ochieng',
                'email' => 'peter.ochieng@outlook.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Grace Njeri',
                'email' => 'grace.njeri@gmail.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'David Mutua',
                'email' => 'david.mutua@yahoo.com',
                'password' => Hash::make('password123'),
            ],
        ];

        $customerRole = Role::where('name', 'Customer')->first();

        foreach ($customers as $customer) {
            $user = User::create($customer);
            $user->assignRole('Customer');
        }
    }
}