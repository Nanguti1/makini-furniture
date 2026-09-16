<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // General Settings
            [
                'key' => 'app_name',
                'value' => 'Makini Queens Furniture',
                'type' => 'string',
                'group' => 'general',
            ],
            [
                'key' => 'app_url',
                'value' => 'https://makiniqueens.co.ke',
                'type' => 'string',
                'group' => 'general',
            ],
            [
                'key' => 'default_currency',
                'value' => 'KES',
                'type' => 'string',
                'group' => 'general',
            ],
            [
                'key' => 'default_locale',
                'value' => 'en',
                'type' => 'string',
                'group' => 'general',
            ],

            // Contact Settings
            [
                'key' => 'contact_phone',
                'value' => '+254 700 123 456',
                'type' => 'string',
                'group' => 'contact',
            ],
            [
                'key' => 'contact_email',
                'value' => 'info@makiniqueens.co.ke',
                'type' => 'string',
                'group' => 'contact',
            ],
            [
                'key' => 'contact_address',
                'value' => 'Eastern Bypass Road, Near Kamakisi Shopping Centre, Nairobi, Kenya',
                'type' => 'string',
                'group' => 'contact',
            ],

            // Mail Settings
            [
                'key' => 'mail_from_address',
                'value' => 'noreply@makiniqueens.co.ke',
                'type' => 'string',
                'group' => 'mail',
            ],
            [
                'key' => 'mail_from_name',
                'value' => 'Makini Queens Furniture',
                'type' => 'string',
                'group' => 'mail',
            ],

            // Payment Settings
            [
                'key' => 'mpesa_shortcode',
                'value' => '174379',
                'type' => 'string',
                'group' => 'payment',
            ],
            [
                'key' => 'mpesa_passkey',
                'value' => 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
                'type' => 'string',
                'group' => 'payment',
            ],
            [
                'key' => 'enable_mpesa',
                'value' => 'true',
                'type' => 'boolean',
                'group' => 'payment',
            ],
            [
                'key' => 'enable_cash_on_delivery',
                'value' => 'true',
                'type' => 'boolean',
                'group' => 'payment',
            ],

            // Shipping Settings
            [
                'key' => 'free_shipping_threshold',
                'value' => '50000',
                'type' => 'integer',
                'group' => 'shipping',
            ],
            [
                'key' => 'default_shipping_cost',
                'value' => '1500',
                'type' => 'integer',
                'group' => 'shipping',
            ],
            [
                'key' => 'shipping_zones',
                'value' => json_encode([
                    'nairobi' => ['name' => 'Nairobi', 'cost' => 1000, 'free_threshold' => 30000],
                    'central' => ['name' => 'Central Kenya', 'cost' => 1500, 'free_threshold' => 40000],
                    'coast' => ['name' => 'Coast', 'cost' => 2500, 'free_threshold' => 60000],
                    'western' => ['name' => 'Western Kenya', 'cost' => 2000, 'free_threshold' => 50000],
                    'eastern' => ['name' => 'Eastern Kenya', 'cost' => 1800, 'free_threshold' => 45000],
                    'rift_valley' => ['name' => 'Rift Valley', 'cost' => 2000, 'free_threshold' => 50000],
                    'nyanza' => ['name' => 'Nyanza', 'cost' => 2200, 'free_threshold' => 55000],
                    'north_eastern' => ['name' => 'North Eastern', 'cost' => 3500, 'free_threshold' => 80000],
                ]),
                'type' => 'array',
                'group' => 'shipping',
            ],

            // Social Media
            [
                'key' => 'facebook_url',
                'value' => 'https://facebook.com/makiniqueens',
                'type' => 'string',
                'group' => 'social',
            ],
            [
                'key' => 'instagram_url',
                'value' => 'https://instagram.com/makiniqueens',
                'type' => 'string',
                'group' => 'social',
            ],
            [
                'key' => 'twitter_url',
                'value' => 'https://twitter.com/makiniqueens',
                'type' => 'string',
                'group' => 'social',
            ],
            [
                'key' => 'whatsapp_number',
                'value' => '+254 700 123 456',
                'type' => 'string',
                'group' => 'social',
            ],

            // Business Hours
            [
                'key' => 'business_hours',
                'value' => json_encode([
                    'monday' => ['open' => '08:00', 'close' => '18:00'],
                    'tuesday' => ['open' => '08:00', 'close' => '18:00'],
                    'wednesday' => ['open' => '08:00', 'close' => '18:00'],
                    'thursday' => ['open' => '08:00', 'close' => '18:00'],
                    'friday' => ['open' => '08:00', 'close' => '18:00'],
                    'saturday' => ['open' => '09:00', 'close' => '17:00'],
                    'sunday' => ['open' => '10:00', 'close' => '16:00'],
                ]),
                'type' => 'array',
                'group' => 'business',
            ],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}