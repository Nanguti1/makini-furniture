import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    hero_image?: string;
}

interface FeaturedCategoriesProps {
    categories?: Category[];
    title?: string;
}

export default function FeaturedCategories({
    categories = [],
    title = 'Shop by Category',
}: FeaturedCategoriesProps) {
    const displayCategories = categories;

    if (displayCategories.length === 0) {
        return null;
    }

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore our carefully curated collections designed for every room
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
                    {displayCategories.map((category) => (
                        <a
                            key={category.id}
                            href={`/catalog?category=${category.slug}`}
                            className="group"
                        >
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-0">
                                    <div className="aspect-square bg-muted/30 flex items-center justify-center relative overflow-hidden">
                                        {category.hero_image ? (
                                            <img
                                                src={category.hero_image}
                                                alt={category.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="text-4xl font-bold text-muted-foreground/50">
                                                {category.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold">{category.name}</h3>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
