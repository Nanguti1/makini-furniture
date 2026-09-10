import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    backgroundClass?: string;
}

export default function HeroSection({
    title = 'Premium Furniture for Modern Living',
    subtitle = 'Discover our curated collection of handcrafted furniture designed to transform your space',
    ctaText = 'Shop Collection',
    ctaLink = '/catalog',
    secondaryCtaText = 'View Lookbooks',
    secondaryCtaLink = '/lookbooks',
    backgroundClass = 'bg-gradient-to-br from-muted/50 to-background',
}: HeroSectionProps) {
    return (
        <section className={`relative overflow-hidden ${backgroundClass}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <a href={ctaLink}>
                                {ctaText}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                        {secondaryCtaText && (
                            <Button size="lg" variant="outline" asChild>
                                <a href={secondaryCtaLink}>
                                    {secondaryCtaText}
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
