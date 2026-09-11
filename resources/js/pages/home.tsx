import HeroSection from '@/components/home/hero-section';
import FeaturedCategories from '@/components/home/featured-categories';
import FeaturedProducts from '@/components/home/featured-products';
import PromotionalSection from '@/components/home/promotional-section';
import FurnitureCollections from '@/components/home/furniture-collections';
import NewsletterSection from '@/components/home/newsletter-section';

interface Category {
    id: number;
    name: string;
    slug: string;
    hero_image?: string;
}

interface HomePageProps {
    banners?: any[];
    featuredCollections?: any[];
    featuredProducts?: any[];
    lookbooks?: any[];
    newProducts?: any[];
    promotionalProducts?: any[];
    categories?: Category[];
}

export default function HomePage({
    banners = [],
    featuredCollections = [],
    featuredProducts = [],
    newProducts = [],
    promotionalProducts = [],
    categories = [],
}: HomePageProps) {
    // Transform featured products to match the shared ProductCard interface
    const transformProducts = (products: any[]) => {
        return products.map((fp) => ({
            id: fp.product?.id || fp.id,
            name: fp.product?.name || fp.name,
            slug: fp.product?.slug || fp.slug,
            price: fp.product?.price || fp.price,
            brand: fp.product?.brand || fp.brand,
            images: fp.product?.images || fp.images,
            is_new: fp.product?.is_new || fp.is_new,
        }));
    };

    const transformedFeaturedProducts = transformProducts(featuredProducts);
    const transformedNewProducts = transformProducts(newProducts);
    const transformedPromotionalProducts = transformProducts(promotionalProducts);

    return (
        <div className="flex flex-col">
            <HeroSection />
            
            <FeaturedCategories categories={categories} />
            
            {transformedFeaturedProducts.length > 0 && (
                <FeaturedProducts 
                    products={transformedFeaturedProducts}
                    title="Featured Products"
                    subtitle="Handpicked selections from our premium collection"
                />
            )}
            
            {transformedNewProducts.length > 0 && (
                <FeaturedProducts 
                    products={transformedNewProducts}
                    title="New Arrivals"
                    subtitle="Discover the latest additions to our collection"
                    viewAllLink="/catalog?sort=newest"
                />
            )}
            
            <PromotionalSection />
            
            {featuredCollections.length > 0 && (
                <FurnitureCollections collections={featuredCollections} />
            )}
            
            {transformedPromotionalProducts.length > 0 && (
                <FeaturedProducts 
                    products={transformedPromotionalProducts}
                    title="Special Offers"
                    subtitle="Limited time deals on premium furniture"
                    viewAllLink="/catalog?sort=sale"
                />
            )}
            
            <NewsletterSection />
        </div>
    );
}
