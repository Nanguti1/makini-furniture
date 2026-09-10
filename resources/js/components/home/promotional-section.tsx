import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PromotionalSectionProps {
    title?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
    backgroundColor?: string;
    imagePosition?: 'left' | 'right';
}

export default function PromotionalSection({
    title = 'Special Offer',
    description = 'Get 20% off your first order with code MAKINI20',
    ctaText = 'Shop Now',
    ctaLink = '/catalog',
    backgroundColor = 'bg-primary/10',
    imagePosition = 'right',
}: PromotionalSectionProps) {
    return (
        <section className={`py-16 md:py-24 ${backgroundColor}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Card className="border-0 shadow-lg">
                    <CardContent className="p-8 md:p-12">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className={`flex-1 ${imagePosition === 'right' ? 'order-1' : 'order-2'}`}>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                                <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                                    {description}
                                </p>
                                <Button size="lg" asChild>
                                    <a href={ctaLink}>{ctaText}</a>
                                </Button>
                            </div>
                            <div className={`flex-1 ${imagePosition === 'right' ? 'order-2' : 'order-1'}`}>
                                <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-6xl font-bold text-primary/20">20%</p>
                                        <p className="text-muted-foreground">OFF</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
