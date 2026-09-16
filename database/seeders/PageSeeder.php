<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'title' => 'About Us',
                'slug' => 'about-us',
                'content' => '<h2>About Makini Queens Furniture</h2>
<p>Located along the Eastern Bypass near Kamakisi, Makini Queens Furniture has been crafting premium Kenyan furniture for over a decade. Our commitment to quality craftsmanship and sustainable practices has made us a trusted name in Kenyan homes.</p>
<h3>Our Story</h3>
<p>Founded with a vision to bring world-class furniture manufacturing to Kenya, we started as a small workshop and have grown into a leading furniture manufacturer serving customers across Nairobi and beyond. Each piece we create is a testament to Kenyan artistry and dedication to excellence.</p>
<h3>Our Craftsmanship</h3>
<p>We source premium materials from sustainable Kenyan suppliers and employ skilled local artisans who bring generations of woodworking expertise to every piece. Our furniture combines traditional techniques with modern design sensibilities.</p>
<h3>Our Commitment</h3>
<ul>
<li>100% Kenyan-made furniture</li>
<li>Sustainable and ethically sourced materials</li>
<li>Support for local artisans and communities</li>
<li>Quality guarantee on all products</li>
<li>Exceptional customer service</li>
</ul>',
                'meta_title' => 'About Makini Queens Furniture - Kenyan Craftsmanship',
                'meta_description' => 'Learn about Makini Queens Furniture, Kenya\'s premier furniture manufacturer located along Eastern Bypass near Kamakisi.',
                'status' => 'published',
                'published_at' => now()->subDays(30),
            ],
            [
                'title' => 'Delivery Information',
                'slug' => 'delivery-information',
                'content' => '<h2>Delivery Information</h2>
<p>We deliver across Kenya with different delivery zones and timelines.</p>
<h3>Delivery Zones</h3>
<ul>
<li><strong>Nairobi:</strong> 2-3 business days (KES 1,000)</li>
<li><strong>Central Kenya:</strong> 3-5 business days (KES 1,500)</li>
<li><strong>Coast:</strong> 5-7 business days (KES 2,500)</li>
<li><strong>Western Kenya:</strong> 4-6 business days (KES 2,000)</li>
<li><strong>Eastern Kenya:</strong> 4-6 business days (KES 1,800)</li>
<li><strong>Rift Valley:</strong> 4-6 business days (KES 2,000)</li>
<li><strong>Nyanza:</strong> 5-7 business days (KES 2,200)</li>
<li><strong>North Eastern:</strong> 7-10 business days (KES 3,500)</li>
</ul>
<h3>Free Delivery</h3>
<p>Free delivery is available for orders above the threshold for each zone:</p>
<ul>
<li>Nairobi: Orders over KES 30,000</li>
<li>Central Kenya: Orders over KES 40,000</li>
<li>Coast: Orders over KES 60,000</li>
<li>Western Kenya: Orders over KES 50,000</li>
<li>Eastern Kenya: Orders over KES 45,000</li>
<li>Rift Valley: Orders over KES 50,000</li>
<li>Nyanza: Orders over KES 55,000</li>
<li>North Eastern: Orders over KES 80,000</li>
</ul>
<h3>Assembly Service</h3>
<p>We offer assembly services for an additional fee. Our professional team will assemble your furniture at your location.</p>',
                'meta_title' => 'Delivery Information - Makini Queens Furniture',
                'meta_description' => 'Delivery information and shipping zones for Makini Queens Furniture across Kenya.',
                'status' => 'published',
                'published_at' => now()->subDays(25),
            ],
            [
                'title' => 'Returns & Refunds',
                'slug' => 'returns-refunds',
                'content' => '<h2>Returns & Refunds Policy</h2>
<p>We want you to be completely satisfied with your Makini Queens furniture purchase.</p>
<h3>Return Policy</h3>
<ul>
<li>Returns accepted within 14 days of delivery</li>
<li>Item must be in original condition and packaging</li>
<li>Customer responsible for return shipping costs</li>
<li>Refund processed within 7 business days of return receipt</li>
</ul>
<h3>Non-Returnable Items</h3>
<ul>
<li>Custom-made furniture</li>
<li>Items marked as final sale</li>
<li>Items damaged due to customer misuse</li>
</ul>
<h3>Damage Claims</h3>
<p>If your furniture arrives damaged, please contact us within 48 hours of delivery. We will arrange for repair or replacement at no additional cost.</p>
<h3>How to Initiate a Return</h3>
<ol>
<li>Contact our customer service at +254 700 123 456</li>
<li>Provide your order number and reason for return</li>
<li>Receive return authorization and shipping instructions</li>
<li>Ship item back to our Eastern Bypass warehouse</li>
<li>Receive refund once return is processed</li>
</ol>',
                'meta_title' => 'Returns & Refunds Policy - Makini Queens Furniture',
                'meta_description' => 'Return and refund policy for Makini Queens Furniture purchases.',
                'status' => 'published',
                'published_at' => now()->subDays(20),
            ],
            [
                'title' => 'Contact Us',
                'slug' => 'contact-us',
                'content' => '<h2>Contact Us</h2>
<p>We\'d love to hear from you! Reach out to us through any of the following channels:</p>
<h3>Visit Our Showroom</h3>
<p><strong>Address:</strong> Eastern Bypass Road, Kamakisi Junction, Nairobi, Kenya</p>
<p><strong>Hours:</strong> Mon-Fri 8am-6pm, Sat 9am-5pm, Sun 10am-4pm</p>
<h3>Phone</h3>
<p><strong>Sales:</strong> +254 700 123 456</p>
<p><strong>Support:</strong> +254 700 789 012</p>
<h3>Email</h3>
<p><strong>General Inquiries:</strong> info@makiniqueens.co.ke</p>
<p><strong>Sales:</strong> sales@makiniqueens.co.ke</p>
<p><strong>Support:</strong> support@makiniqueens.co.ke</p>
<h3>Social Media</h3>
<p>Follow us on social media for latest updates and promotions:</p>
<ul>
<li>Facebook: @makiniqueens</li>
<li>Instagram: @makiniqueens</li>
<li>Twitter: @makiniqueens</li>
<li>WhatsApp: +254 700 123 456</li>
</ul>
<h3>WhatsApp</h3>
<p>For quick responses, message us on WhatsApp: +254 700 123 456</p>',
                'meta_title' => 'Contact Us - Makini Queens Furniture',
                'meta_description' => 'Contact information for Makini Queens Furniture including showroom location, phone, email, and social media.',
                'status' => 'published',
                'published_at' => now()->subDays(15),
            ],
            [
                'title' => 'Warranty Information',
                'slug' => 'warranty-information',
                'content' => '<h2>Warranty Information</h2>
<p>Makini Queens Furniture stands behind the quality of our products with comprehensive warranty coverage.</p>
<h3>Warranty Coverage</h3>
<ul>
<li><strong>Structural Warranty:</strong> 5 years on frame and construction</li>
<li><strong>Upholstery Warranty:</strong> 2 years on fabric and leather</li>
<li><strong>Mechanical Warranty:</strong> 1 year on moving parts (drawers, hinges, etc.)</li>
<li><strong>Finish Warranty:</strong> 1 year on wood finishes and coatings</li>
</ul>
<h3>What\'s Covered</h3>
<ul>
<li>Defects in materials and workmanship</li>
<li>Structural failures under normal use</li>
<li>Manufacturing defects</li>
</ul>
<h3>What\'s Not Covered</h3>
<ul>
<li>Normal wear and tear</li>
<li>Damage from misuse or abuse</li>
<li>Damage from improper assembly</li>
<li>Exposure to extreme conditions</li>
<li>Commercial use (unless specified)</li>
</ul>
<h3>Making a Warranty Claim</h3>
<p>To make a warranty claim, please contact our customer service with your order number and description of the issue. We will assess the claim and provide repair, replacement, or refund as appropriate.</p>',
                'meta_title' => 'Warranty Information - Makini Queens Furniture',
                'meta_description' => 'Warranty coverage and claim information for Makini Queens Furniture products.',
                'status' => 'published',
                'published_at' => now()->subDays(10),
            ],
        ];

        foreach ($pages as $page) {
            Page::create($page);
        }
    }
}