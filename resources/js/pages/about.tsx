import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About Makini Queens Furniture</h1>
                    <p className="text-xl text-muted-foreground">
                        Crafting Excellence in Kenyan Furniture Since 2010
                    </p>
                </div>

                {/* Our Story */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl">Our Story</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>
                            Makini Queens Furniture was founded with a simple vision: to bring world-class furniture 
                            craftsmanship to Kenyan homes and businesses. What started as a small workshop in Nairobi 
                            has grown into one of Kenya's premier furniture manufacturers and retailers.
                        </p>
                        <p>
                            Our name "Makini" means "intelligent" or "clever" in Swahili, reflecting our commitment to 
                            smart design, innovative solutions, and sustainable practices. "Queens" represents our 
                            dedication to quality fit for royalty, while honoring the strength and elegance of African 
                            craftsmanship.
                        </p>
                    </CardContent>
                </Card>

                {/* Our Mission */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl">Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg">
                            To transform living and working spaces across Kenya with beautifully crafted, 
                            sustainable furniture that combines traditional African artistry with modern design principles.
                        </p>
                    </CardContent>
                </Card>

                {/* Our Values */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl">Our Values</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Quality Craftsmanship</h3>
                                <p className="text-muted-foreground">
                                    Every piece is meticulously crafted by skilled artisans using premium materials 
                                    and time-honored techniques.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Sustainability</h3>
                                <p className="text-muted-foreground">
                                    We source sustainable materials and employ eco-friendly practices to minimize 
                                    our environmental footprint.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Kenyan Heritage</h3>
                                <p className="text-muted-foreground">
                                    We celebrate African design traditions while incorporating contemporary 
                                    aesthetics for modern living.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Customer Satisfaction</h3>
                                <p className="text-muted-foreground">
                                    Our customers are at the heart of everything we do, from design to delivery 
                                    and after-sales support.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Separator className="my-8" />

                {/* Contact Information */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-muted-foreground mb-6">
                        Have questions about our products or services? We'd love to hear from you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="/contact" 
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                            Contact Us
                        </a>
                        <a 
                            href="/catalog" 
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                        >
                            Browse Collection
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}