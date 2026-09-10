import ProductCard from '../catalog/product-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    brand?: { id: number; name: string; slug: string };
    images?: Array<{ id: number; url: string; is_primary: boolean }>;
    is_new?: boolean;
}

interface FeaturedProductsProps {
    products?: Product[];
    title?: string;
    subtitle?: string;
    showViewAll?: boolean;
    viewAllLink?: string;
}

export default function FeaturedProducts({
    products = [],
    title = 'Featured Products',
    subtitle = 'Handpicked selections from our premium collection',
    showViewAll = true,
    viewAllLink = '/catalog',
}: FeaturedProductsProps) {
    const displayProducts = products.slice(0, 8);

    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
                        <p className="text-muted-foreground">{subtitle}</p>
                    </div>
                    {showViewAll && (
                        <Button variant="ghost" asChild className="mt-4 md:mt-0">
                            <a href={viewAllLink}>
                                View All
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    )}
                </div>

                {displayProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {displayProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        No featured products available at the moment.
                    </div>
                )}
            </div>
        </section>
    );
}
