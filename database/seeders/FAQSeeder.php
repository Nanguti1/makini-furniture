<?php

namespace Database\Seeders;

use App\Models\FAQ;
use Illuminate\Database\Seeder;

class FAQSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'question' => 'Where is Makini Queens Furniture located?',
                'answer' => 'We are located along the Eastern Bypass Road near Kamakisi Shopping Centre in Nairobi. Our showroom is open Monday to Friday 8am-6pm, Saturday 9am-5pm, and Sunday 10am-4pm.',
                'category' => 'General',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'question' => 'Do you deliver outside Nairobi?',
                'answer' => 'Yes, we deliver across all 8 provinces in Kenya including Central, Coast, Western, Eastern, Rift Valley, Nyanza, and North Eastern. Delivery times and costs vary by region.',
                'category' => 'Delivery',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'question' => 'What payment methods do you accept?',
                'answer' => 'We accept M-Pesa, cash on delivery, bank transfers, and mobile money. For large orders, we also accept installment payments.',
                'category' => 'Payment',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'question' => 'Is your furniture really made in Kenya?',
                'answer' => 'Yes! All our furniture is 100% Kenyan-made at our Eastern Bypass workshop. We employ local artisans and source materials from sustainable Kenyan suppliers.',
                'category' => 'General',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'question' => 'Do you offer assembly services?',
                'answer' => 'Yes, we offer professional assembly services for an additional fee. Our team will assemble your furniture at your location and ensure everything is properly set up.',
                'category' => 'Services',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'question' => 'What is your warranty policy?',
                'answer' => 'We offer comprehensive warranty coverage: 5 years on structural components, 2 years on upholstery, 1 year on mechanical parts, and 1 year on finishes. This covers manufacturing defects and normal use issues.',
                'category' => 'Warranty',
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'question' => 'Can I customize furniture to my specifications?',
                'answer' => 'Yes, we offer custom furniture manufacturing. You can choose materials, finishes, dimensions, and designs. Custom orders typically take 4-6 weeks to complete.',
                'category' => 'Custom Orders',
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'question' => 'Do you have fabric samples available?',
                'answer' => 'Yes, we have fabric samples including our signature Kenyan kikoy and kitenge fabrics, as well as imported leathers and cottons. Visit our showroom to see and feel the materials.',
                'category' => 'Materials',
                'is_active' => true,
                'sort_order' => 8,
            ],
            [
                'question' => 'How long does delivery take?',
                'answer' => 'Delivery times vary by region: Nairobi 2-3 business days, Central Kenya 3-5 days, Coast 5-7 days, and other regions 4-7 days. Custom orders may take longer depending on specifications.',
                'category' => 'Delivery',
                'is_active' => true,
                'sort_order' => 9,
            ],
            [
                'question' => 'What is your return policy?',
                'answer' => 'We accept returns within 14 days of delivery for items in original condition. Custom-made items and final sale items cannot be returned. Return shipping costs are the customer\'s responsibility.',
                'category' => 'Returns',
                'is_active' => true,
                'sort_order' => 10,
            ],
            [
                'question' => 'Do you offer financing or installment plans?',
                'answer' => 'Yes, we offer flexible installment plans for purchases over KES 50,000. We partner with leading Kenyan financial institutions to provide affordable financing options.',
                'category' => 'Payment',
                'is_active' => true,
                'sort_order' => 11,
            ],
            [
                'question' => 'Are your materials sustainable?',
                'answer' => 'Yes, we prioritize sustainability. We source wood from certified sustainable forests, use eco-friendly finishes, and employ traditional Kenyan crafting methods that minimize environmental impact.',
                'category' => 'Materials',
                'is_active' => true,
                'sort_order' => 12,
            ],
            [
                'question' => 'Can I visit your workshop?',
                'answer' => 'Yes, we welcome visitors to our Eastern Bypass workshop by appointment. Seeing our artisans at work gives you insight into the quality and care that goes into each piece.',
                'category' => 'General',
                'is_active' => true,
                'sort_order' => 13,
            ],
            [
                'question' => 'Do you offer corporate or bulk discounts?',
                'answer' => 'Yes, we offer special pricing for corporate clients, interior designers, and bulk orders. Contact our sales team for custom quotes on large projects.',
                'category' => 'Pricing',
                'is_active' => true,
                'sort_order' => 14,
            ],
            [
                'question' => 'How do I care for my furniture?',
                'answer' => 'Care instructions vary by material. Generally, dust regularly with a soft cloth, avoid direct sunlight, use coasters for drinks, and clean spills immediately. We provide detailed care guides with each purchase.',
                'category' => 'Care',
                'is_active' => true,
                'sort_order' => 15,
            ],
        ];

        foreach ($faqs as $faq) {
            FAQ::create($faq);
        }
    }
}