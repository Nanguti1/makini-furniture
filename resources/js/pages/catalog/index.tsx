import ProductCard from '@/components/catalog/product-card';
import Pagination from '@/components/ui/pagination';
import EmptyState from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductImage {
    id: number;
    url: string;
    is_primary: boolean;
}

interface ProductBrand {
    id: number;
    name: string;
    slug: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    brand?: ProductBrand;
    images?: ProductImage[];
    is_new?: boolean;
}

interface PaginatedProducts {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface CatalogPageProps {
    products?: PaginatedProducts;
    filters?: Record<string, any>;
}

export default function CatalogPage({ products, filters = {} }: CatalogPageProps) {
    // Loading state
    if (!products) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="aspect-square w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Empty state
    if (products.data.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Catalog</h1>
                    <p className="text-muted-foreground">Browse our premium furniture collection.</p>
                </div>
                <EmptyState
                    icon="package"
                    title="No products found"
                    description="Try adjusting your filters or browse our featured collections."
                    action={
                        <a
                            href="/catalog"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                            Clear Filters
                        </a>
                    }
                />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Catalog</h1>
                <p className="text-muted-foreground">
                    Browse our premium furniture collection ({products.total} products)
                </p>
            </div>

            {/* Basic Category Navigation */}
            <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                    <a
                        href="/catalog"
                        className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                            Object.keys(filters).length === 0
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background hover:bg-accent hover:text-accent-foreground'
                        }`}
                    >
                        All Products
                    </a>
                    <a
                        href="/catalog?category=sofas"
                        className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                            filters.category === 'sofas'
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background hover:bg-accent hover:text-accent-foreground'
                        }`}
                    >
                        Sofas
                    </a>
                    <a
                        href="/catalog?category=tables"
                        className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                            filters.category === 'tables'
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background hover:bg-accent hover:text-accent-foreground'
                        }`}
                    >
                        Tables
                    </a>
                    <a
                        href="/catalog?category=chairs"
                        className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                            filters.category === 'chairs'
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background hover:bg-accent hover:text-accent-foreground'
                        }`}
                    >
                        Chairs
                    </a>
                    <a
                        href="/catalog?category=bedroom"
                        className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                            filters.category === 'bedroom'
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background hover:bg-accent hover:text-accent-foreground'
                        }`}
                    >
                        Bedroom
                    </a>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {products.data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Pagination */}
            {products.last_page > 1 && (
                <div className="flex justify-center">
                    <Pagination
                        currentPage={products.current_page}
                        totalPages={products.last_page}
                        hrefBuilder={(page) => {
                            const params = new URLSearchParams();
                            Object.entries(filters).forEach(([key, value]) => {
                                if (value) params.set(key, String(value));
                            });
                            params.set('page', String(page));
                            return `/catalog?${params.toString()}`;
                        }}
                    />
                </div>
            )}
        </div>
    );
}
