import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { router } from '@inertiajs/react';

interface Lookbook {
    id: number;
    title: string;
    slug: string;
    description?: string;
    hero_image?: string;
    status: string;
    published_at?: string;
}

interface LookbooksIndexProps {
    lookbooks: Lookbook[];
}

export default function LookbooksIndexPage({ lookbooks }: LookbooksIndexProps) {
    const formatDate = (dateString?: string) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4">Lookbooks</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Explore our curated furniture collections and find inspiration for your perfect space.
                </p>
            </div>

            {/* Lookbooks Grid */}
            {lookbooks && lookbooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {lookbooks.map((lookbook) => (
                        <Card key={lookbook.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                            <div
                                className="aspect-[4/3] bg-muted/30 relative overflow-hidden"
                                onClick={() => router.visit(`/lookbooks/${lookbook.slug}`)}
                            >
                                {lookbook.hero_image ? (
                                    <img
                                        src={lookbook.hero_image}
                                        alt={lookbook.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <BookOpen className="h-16 w-16 text-muted-foreground/50" />
                                    </div>
                                )}
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                    {lookbook.title}
                                </h3>
                                {lookbook.description && (
                                    <p className="text-muted-foreground mb-4 line-clamp-2">
                                        {lookbook.description}
                                    </p>
                                )}
                                {lookbook.published_at && (
                                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        <span>{formatDate(lookbook.published_at)}</span>
                                    </div>
                                )}
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => router.visit(`/lookbooks/${lookbook.slug}`)}
                                >
                                    View Lookbook
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="py-12 text-center">
                        <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">No lookbooks available</h2>
                        <p className="text-muted-foreground">
                            Check back soon for new furniture collections and inspiration.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
