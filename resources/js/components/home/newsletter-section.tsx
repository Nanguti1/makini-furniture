import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

interface NewsletterSectionProps {
    title?: string;
    description?: string;
    placeholder?: string;
    buttonText?: string;
}

export default function NewsletterSection({
    title = 'Stay Inspired',
    description = 'Subscribe to our newsletter for exclusive offers, new arrivals, and design inspiration',
    placeholder = 'Enter your email',
    buttonText = 'Subscribe',
}: NewsletterSectionProps) {
    return (
        <section className="py-16 md:py-24 bg-navy relative z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/20 rounded-full">
                            <Mail className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gold-metallic">{title}</h2>
                    <p className="text-secondary mb-8">{description}</p>
                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <Input
                            type="email"
                            placeholder={placeholder}
                            className="flex-1 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                            required
                        />
                        <Button type="submit" className="whitespace-nowrap">
                            {buttonText}
                        </Button>
                    </form>
                    <p className="text-xs text-secondary-dark mt-4">
                        By subscribing, you agree to our Privacy Policy and consent to receive updates.
                    </p>
                </div>
            </div>
        </section>
    );
}
