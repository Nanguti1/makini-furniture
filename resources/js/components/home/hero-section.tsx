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
    ctaLink = '#categories',
    secondaryCtaText = 'View Lookbooks',
    secondaryCtaLink = '/lookbooks',
    backgroundClass = 'bg-gradient-to-br from-muted/50 to-background',
}: HeroSectionProps) {
    return (
        <section className={`relative overflow-hidden min-h-screen ${backgroundClass}`}>
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/images/hero-banner-bg.avif)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy/80 to-navy/60" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gold-metallic">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl text-secondary mb-8 max-w-2xl mx-auto">
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
