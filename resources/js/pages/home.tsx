import HeroSection from '@/components/home/hero-section';
import FeaturedCategories from '@/components/home/featured-categories';
import FeaturedProducts from '@/components/home/featured-products';
import PromotionalSection from '@/components/home/promotional-section';
import FurnitureCollections from '@/components/home/furniture-collections';
import NewsletterSection from '@/components/home/newsletter-section';

interface HomePageProps {
    banners?: any[];
    featuredCollections?: any[];
    featuredProducts?: any[];
    lookbooks?: any[];
    newProducts?: any[];
    promotionalProducts?: any[];
}

export default function HomePage({
    banners = [],
    featuredCollections = [],
    featuredProducts = [],
    newProducts = [],
    promotionalProducts = [],
}: HomePageProps) {
    return (
        <div className="flex flex-col">
            <HeroSection />
            
            <FeaturedCategories />
            
            {featuredProducts.length > 0 && (
                <FeaturedProducts 
                    products={featuredProducts}
                    title="Featured Products"
                    subtitle="Handpicked selections from our premium collection"
                />
            )}
            
            {newProducts.length > 0 && (
                <FeaturedProducts 
                    products={newProducts}
                    title="New Arrivals"
                    subtitle="Discover the latest additions to our collection"
                    viewAllLink="/catalog?sort=newest"
                />
            )}
            
            <PromotionalSection />
            
            {featuredCollections.length > 0 && (
                <FurnitureCollections collections={featuredCollections} />
            )}
            
            {promotionalProducts.length > 0 && (
                <FeaturedProducts 
                    products={promotionalProducts}
                    title="Special Offers"
                    subtitle="Limited time deals on premium furniture"
                    viewAllLink="/catalog?sort=sale"
                />
            )}
            
            <NewsletterSection />
        </div>
    );
}
