<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@makiniqueens.co.ke',
            'password' => Hash::make('password'),
            'is_admin' => true,
        ]);

        // Manager user
        User::create([
            'name' => 'Warehouse Manager',
            'email' => 'manager@makiniqueens.co.ke',
            'password' => Hash::make('password'),
            'is_admin' => true,
        ]);

        // Sample customers
        $customers = [
            [
                'name' => 'John Kamau',
                'email' => 'john.kamau@gmail.com',
                'password' => Hash::make('password123'),
                'is_admin' => false,
            ],
            [
                'name' => 'Mary Wanjiku',
                'email' => 'mary.wanjiku@yahoo.com',
                'password' => Hash::make('password123'),
                'is_admin' => false,
            ],
            [
                'name' => 'Peter Ochieng',
                'email' => 'peter.ochieng@outlook.com',
                'password' => Hash::make('password123'),
                'is_admin' => false,
            ],
            [
                'name' => 'Grace Njeri',
                'email' => 'grace.njeri@gmail.com',
                'password' => Hash::make('password123'),
                'is_admin' => false,
            ],
            [
                'name' => 'David Mutua',
                'email' => 'david.mutua@yahoo.com',
                'password' => Hash::make('password123'),
                'is_admin' => false,
            ],
        ];

        foreach ($customers as $customer) {
            User::create($customer);
        }
    }
}