<?php

namespace Database\Seeders;

use App\Models\Warehouse;
use Illuminate\Database\Seeder;

class WarehouseSeeder extends Seeder
{
    public function run(): void
    {
        $warehouses = [
            [
                'name' => 'Makini Queens Main Warehouse',
                'code' => 'MKQ-MAIN',
                'phone' => '+254 700 123 456',
                'email' => 'warehouse@makiniqueens.co.ke',
                'address_line_1' => 'Eastern Bypass Road',
                'address_line_2' => 'Near Kamakisi Shopping Centre',
                'city' => 'Nairobi',
                'state' => 'Nairobi County',
                'postal_code' => '00501',
                'country' => 'KE',
                'is_active' => true,
            ],
            [
                'name' => 'Makini Queens Showroom',
                'code' => 'MKQ-SHOW',
                'phone' => '+254 700 789 012',
                'email' => 'showroom@makiniqueens.co.ke',
                'address_line_1' => 'Eastern Bypass Road',
                'address_line_2' => 'Kamakisi Junction',
                'city' => 'Nairobi',
                'state' => 'Nairobi County',
                'postal_code' => '00502',
                'country' => 'KE',
                'is_active' => true,
            ],
            [
                'name' => 'Makini Queens Distribution Center',
                'code' => 'MKQ-DIST',
                'phone' => '+254 700 345 678',
                'email' => 'distribution@makiniqueens.co.ke',
                'address_line_1' => 'Eastern Bypass Industrial Area',
                'address_line_2' => 'Phase 2, Kamakisi',
                'city' => 'Nairobi',
                'state' => 'Nairobi County',
                'postal_code' => '00503',
                'country' => 'KE',
                'is_active' => true,
            ],
        ];

        foreach ($warehouses as $warehouse) {
            Warehouse::create($warehouse);
        }
    }
}