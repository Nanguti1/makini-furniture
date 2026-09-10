import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar } from 'lucide-react';

interface PageSection {
    id: number;
    type: string;
    configuration?: Record<string, any>;
    sort_order: number;
}

interface Page {
    id: number;
    title: string;
    slug: string;
    content?: string;
    meta_title?: string;
    meta_description?: string;
    status: string;
    published_at?: string;
    sections?: PageSection[];
}

interface PageShowProps {
    page: Page;
}

export default function PageShowPage({ page }: PageShowProps) {
    const formatDate = (dateString?: string) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const renderPageSection = (section: PageSection) => {
        const config = section.configuration || {};

        switch (section.type) {
            case 'text':
                return (
                    <div key={section.id} className="prose prose-lg max-w-none">
                        {config.content && (
                            <div dangerouslySetInnerHTML={{ __html: config.content }} />
                        )}
                    </div>
                );
            case 'image':
                return (
                    <div key={section.id} className="my-8">
                        {config.src && (
                            <img
                                src={config.src}
                                alt={config.alt || section.type}
                                className="w-full rounded-lg"
                            />
                        )}
                        {config.caption && (
                            <p className="text-sm text-muted-foreground text-center mt-2">
                                {config.caption}
                            </p>
                        )}
                    </div>
                );
            case 'hero':
                return (
                    <div key={section.id} className="my-8">
                        {config.image && (
                            <div className="relative h-48 sm:h-64 md:h-96 rounded-lg overflow-hidden">
                                <img
                                    src={config.image}
                                    alt={config.title || 'Hero'}
                                    className="w-full h-full object-cover"
                                />
                                {config.title && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 md:p-6">
                                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">{config.title}</h2>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{page.title}</h1>
                    {page.published_at && (
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Published on {formatDate(page.published_at)}</span>
                        </div>
                    )}
                </div>

                <Separator className="mb-8" />

                {/* Page Content */}
                {page.content && (
                    <div className="prose prose-lg max-w-none mb-8">
                        <div dangerouslySetInnerHTML={{ __html: page.content }} />
                    </div>
                )}

                {/* Page Sections */}
                {page.sections && page.sections.length > 0 && (
                    <div className="space-y-8">
                        {page.sections
                            .sort((a, b) => a.sort_order - b.sort_order)
                            .map(renderPageSection)}
                    </div>
                )}

                {/* Fallback for empty pages */}
                {!page.content && (!page.sections || page.sections.length === 0) && (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <p className="text-muted-foreground">
                                This page is currently being updated. Please check back later.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
