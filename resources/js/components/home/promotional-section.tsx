import { Button } from '@/components/ui/button';

interface PromotionalSectionProps {
    title?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
}

export default function PromotionalSection({
    title = 'Special Offer',
    description = 'Get 20% off your first order with code MAKINI20',
    ctaText = 'Shop Now',
    ctaLink = '/catalog',
}: PromotionalSectionProps) {
    return (
        <section className="relative overflow-hidden py-16 md:py-24 min-h-[400px]">
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: 'url(/images/elegance-and-luxury-in-a-luxurious-design-furniture-vitrine-furniture-5861752.webp)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy/80 to-navy/60 z-10" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gold-metallic">{title}</h2>
                    <p className="text-lg text-secondary mb-6 font-medium mx-auto max-w-2xl">
                        {description}
                    </p>
                    <Button size="lg" asChild>
                        <a href={ctaLink}>{ctaText}</a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
