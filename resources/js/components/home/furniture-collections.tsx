import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Collection {
    id: number;
    name: string;
    slug: string;
    hero_image?: string;
}

interface FeaturedCollection {
    id: number;
    collection: Collection;
}

interface FurnitureCollectionsProps {
    collections?: FeaturedCollection[];
    title?: string;
    subtitle?: string;
}

export default function FurnitureCollections({
    collections = [],
    title = 'Curated Collections',
    subtitle = 'Explore our carefully designed furniture collections',
}: FurnitureCollectionsProps) {
    const defaultCollections: FeaturedCollection[] = [
        {
            id: 1,
            collection: { id: 1, name: 'Modern Minimalist', slug: 'modern-minimalist' },
        },
        {
            id: 2,
            collection: { id: 2, name: 'Scandinavian Comfort', slug: 'scandinavian-comfort' },
        },
        {
            id: 3,
            collection: { id: 3, name: 'Industrial Chic', slug: 'industrial-chic' },
        },
    ];

    const displayCollections = collections.length > 0 ? collections : defaultCollections;

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {displayCollections.map((featuredCollection) => (
                        <Card key={featuredCollection.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                            <div className="relative aspect-[4/3] bg-muted/30 overflow-hidden">
                                {featuredCollection.collection.hero_image ? (
                                    <img
                                        src={featuredCollection.collection.hero_image}
                                        alt={featuredCollection.collection.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted/30">
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-muted-foreground/30 mb-2">
                                                {featuredCollection.collection.name.charAt(0)}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <CardHeader>
                                <CardTitle className="text-xl">{featuredCollection.collection.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full" asChild>
                                    <a href={`/catalog?collection=${featuredCollection.collection.slug}`}>
                                        Explore Collection
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
