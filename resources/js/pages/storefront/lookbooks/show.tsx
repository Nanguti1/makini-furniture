import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, ArrowLeft, ShoppingBag, BookOpen } from 'lucide-react';
import { router } from '@inertiajs/react';

interface LookbookItem {
    id: number;
    lookbook_id: number;
    product_id: number;
    image?: string;
    title?: string;
    description?: string;
    sort_order: number;
    product?: {
        id: number;
        name: string;
        slug: string;
        price?: number;
    };
}

interface Lookbook {
    id: number;
    title: string;
    slug: string;
    description?: string;
    hero_image?: string;
    status: string;
    published_at?: string;
    items?: LookbookItem[];
}

interface LookbookShowProps {
    lookbook: Lookbook;
}

export default function LookbookShowPage({ lookbook }: LookbookShowProps) {
    const formatDate = (dateString?: string) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const sortedItems = lookbook.items
        ? [...lookbook.items].sort((a, b) => a.sort_order - b.sort_order)
        : [];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Button */}
            <Button
                variant="ghost"
                onClick={() => router.visit('/lookbooks')}
                className="mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Lookbooks
            </Button>

            {/* Hero Section */}
            {lookbook.hero_image && (
                <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
                    <img
                        src={lookbook.hero_image}
                        alt={lookbook.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6 md:p-12">
                        <div className="text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">{lookbook.title}</h1>
                            {lookbook.published_at && (
                                <div className="flex items-center text-white/80">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>{formatDate(lookbook.published_at)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Fallback Header when no hero image */}
            {!lookbook.hero_image && (
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">{lookbook.title}</h1>
                    {lookbook.published_at && (
                        <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{formatDate(lookbook.published_at)}</span>
                        </div>
                    )}
                </div>
            )}

            <Separator className="mb-8" />

            {/* Description */}
            {lookbook.description && (
                <div className="max-w-4xl mx-auto mb-12">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {lookbook.description}
                    </p>
                </div>
            )}

            {/* Lookbook Items */}
            {sortedItems.length > 0 ? (
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Collection Items</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedItems.map((item) => (
                            <Card key={item.id} className="overflow-hidden group">
                                <div className="aspect-[4/3] bg-muted/30 relative overflow-hidden">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.title || item.product?.name || 'Lookbook item'}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <BookOpen className="h-16 w-16 text-muted-foreground/50" />
                                        </div>
                                    )}
                                </div>
                                <CardContent className="p-6">
                                    {item.title && (
                                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    )}
                                    {item.description && (
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                            {item.description}
                                        </p>
                                    )}
                                    {item.product && (
                                        <div className="mt-4 pt-4 border-t">
                                            <p className="text-sm font-medium mb-2">
                                                {item.product.name}
                                            </p>
                                            {item.product.price && (
                                                <p className="text-lg font-bold mb-3">
                                                    ${item.product.price.toFixed(2)}
                                                </p>
                                            )}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full"
                                                onClick={() => router.visit(`/products/${item.product.slug}`)}
                                            >
                                                <ShoppingBag className="h-4 w-4 mr-2" />
                                                View Product
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <Card className="max-w-2xl mx-auto">
                    <CardContent className="py-12 text-center">
                        <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">No items in this lookbook</h2>
                        <p className="text-muted-foreground">
                            This lookbook is currently being updated with new furniture pieces.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
