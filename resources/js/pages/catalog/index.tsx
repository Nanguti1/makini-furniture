import ProductCard from '@/components/catalog/product-card';
import FilterDrawer from '@/components/catalog/filter-drawer';
import Pagination from '@/components/ui/pagination';
import EmptyState from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';

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
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const [localFilters, setLocalFilters] = useState<Record<string, any>>(filters);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Sync local filters with URL filters
    useEffect(() => {
        setLocalFilters(filters);
        setSearchQuery(filters.search || '');
    }, [filters]);

    const applyFilters = () => {
        router.get('/catalog', localFilters, {
            preserveState: true,
            preserveScroll: true,
        });
        setFilterDrawerOpen(false);
    };

    const clearFilters = () => {
        const clearedFilters: Record<string, any> = {};
        setLocalFilters(clearedFilters);
        setSearchQuery('');
        router.get('/catalog', clearedFilters, {
            preserveState: true,
            preserveScroll: true,
        });
        setFilterDrawerOpen(false);
    };

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        const newFilters = { ...localFilters, search: value || undefined };
        setLocalFilters(newFilters);
        
        // Debounce search
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        
        searchTimeoutRef.current = setTimeout(() => {
            router.get('/catalog', newFilters, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 300);
    };

    const handleSort = (value: string) => {
        const newFilters = { ...localFilters, sort: value || undefined };
        setLocalFilters(newFilters);
        router.get('/catalog', newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const activeFilterCount = Object.keys(localFilters).filter(
        key => localFilters[key] !== undefined && localFilters[key] !== '' && localFilters[key] !== null && key !== 'search' && key !== 'sort'
    ).length;

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
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Catalog</h1>
                <p className="text-muted-foreground">
                    Browse our premium furniture collection ({products.total} products)
                </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-6 space-y-4">
                {/* Search Input */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10"
                    />
                    {searchQuery && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                            onClick={() => handleSearch('')}
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                {/* Filter and Sort Controls */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    {/* Mobile Filter Button */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button
                            variant="outline"
                            onClick={() => setFilterDrawerOpen(true)}
                            className="flex-1 sm:flex-none"
                        >
                            <SlidersHorizontal className="h-4 w-4 mr-2" />
                            Filters
                            {activeFilterCount > 0 && (
                                <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {activeFilterCount}
                                </span>
                            )}
                        </Button>
                        {activeFilterCount > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearFilters}
                                className="text-muted-foreground"
                            >
                                Clear all
                            </Button>
                        )}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
                        <Select
                            value={localFilters.sort || ''}
                            onValueChange={handleSort}
                        >
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">Featured</SelectItem>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="name">Name (A-Z)</SelectItem>
                                <SelectItem value="price_low">Price (Low to High)</SelectItem>
                                <SelectItem value="price_high">Price (High to Low)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Active Filters Display */}
                {activeFilterCount > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {localFilters.category && (
                            <div className="inline-flex items-center gap-1 bg-secondary rounded-full px-3 py-1 text-sm">
                                <span>Category: {localFilters.category}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 rounded-full"
                                    onClick={() => {
                                        const newFilters = { ...localFilters };
                                        delete newFilters.category;
                                        setLocalFilters(newFilters);
                                        router.get('/catalog', newFilters, {
                                            preserveState: true,
                                            preserveScroll: true,
                                        });
                                    }}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        )}
                        {localFilters.min_price && (
                            <div className="inline-flex items-center gap-1 bg-secondary rounded-full px-3 py-1 text-sm">
                                <span>Price: ${localFilters.min_price}</span>
                                {localFilters.max_price && <span>- ${localFilters.max_price}</span>}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 rounded-full"
                                    onClick={() => {
                                        const newFilters = { ...localFilters };
                                        delete newFilters.min_price;
                                        delete newFilters.max_price;
                                        setLocalFilters(newFilters);
                                        router.get('/catalog', newFilters, {
                                            preserveState: true,
                                            preserveScroll: true,
                                        });
                                    }}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        )}
                        {localFilters.material && (
                            <div className="inline-flex items-center gap-1 bg-secondary rounded-full px-3 py-1 text-sm">
                                <span>Material: {localFilters.material}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 rounded-full"
                                    onClick={() => {
                                        const newFilters = { ...localFilters };
                                        delete newFilters.material;
                                        setLocalFilters(newFilters);
                                        router.get('/catalog', newFilters, {
                                            preserveState: true,
                                            preserveScroll: true,
                                        });
                                    }}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        )}
                        {localFilters.color && (
                            <div className="inline-flex items-center gap-1 bg-secondary rounded-full px-3 py-1 text-sm">
                                <span>Color: {localFilters.color}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 rounded-full"
                                    onClick={() => {
                                        const newFilters = { ...localFilters };
                                        delete newFilters.color;
                                        setLocalFilters(newFilters);
                                        router.get('/catalog', newFilters, {
                                            preserveState: true,
                                            preserveScroll: true,
                                        });
                                    }}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        )}
                        {localFilters.room && (
                            <div className="inline-flex items-center gap-1 bg-secondary rounded-full px-3 py-1 text-sm">
                                <span>Room: {localFilters.room}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 rounded-full"
                                    onClick={() => {
                                        const newFilters = { ...localFilters };
                                        delete newFilters.room;
                                        setLocalFilters(newFilters);
                                        router.get('/catalog', newFilters, {
                                            preserveState: true,
                                            preserveScroll: true,
                                        });
                                    }}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        )}
                        {localFilters.available === true && (
                            <div className="inline-flex items-center gap-1 bg-secondary rounded-full px-3 py-1 text-sm">
                                <span>In stock only</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 rounded-full"
                                    onClick={() => {
                                        const newFilters = { ...localFilters };
                                        delete newFilters.available;
                                        setLocalFilters(newFilters);
                                        router.get('/catalog', newFilters, {
                                            preserveState: true,
                                            preserveScroll: true,
                                        });
                                    }}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Basic Category Navigation */}
            <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={Object.keys(localFilters).filter(k => k !== 'search' && k !== 'sort').length === 0 ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                            const newFilters = { ...localFilters };
                            delete newFilters.category;
                            setLocalFilters(newFilters);
                            router.get('/catalog', newFilters, {
                                preserveState: true,
                                preserveScroll: true,
                            });
                        }}
                    >
                        All Products
                    </Button>
                    <Button
                        variant={localFilters.category === 'sofas' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                            const newFilters = { ...localFilters, category: 'sofas' };
                            setLocalFilters(newFilters);
                            router.get('/catalog', newFilters, {
                                preserveState: true,
                                preserveScroll: true,
                            });
                        }}
                    >
                        Sofas
                    </Button>
                    <Button
                        variant={localFilters.category === 'tables' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                            const newFilters = { ...localFilters, category: 'tables' };
                            setLocalFilters(newFilters);
                            router.get('/catalog', newFilters, {
                                preserveState: true,
                                preserveScroll: true,
                            });
                        }}
                    >
                        Tables
                    </Button>
                    <Button
                        variant={localFilters.category === 'chairs' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                            const newFilters = { ...localFilters, category: 'chairs' };
                            setLocalFilters(newFilters);
                            router.get('/catalog', newFilters, {
                                preserveState: true,
                                preserveScroll: true,
                            });
                        }}
                    >
                        Chairs
                    </Button>
                    <Button
                        variant={localFilters.category === 'bedroom' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                            const newFilters = { ...localFilters, category: 'bedroom' };
                            setLocalFilters(newFilters);
                            router.get('/catalog', newFilters, {
                                preserveState: true,
                                preserveScroll: true,
                            });
                        }}
                    >
                        Bedroom
                    </Button>
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
                            Object.entries(localFilters).forEach(([key, value]) => {
                                if (value) params.set(key, String(value));
                            });
                            params.set('page', String(page));
                            return `/catalog?${params.toString()}`;
                        }}
                    />
                </div>
            )}

            {/* Filter Drawer */}
            <FilterDrawer
                open={filterDrawerOpen}
                onOpenChange={setFilterDrawerOpen}
                filters={localFilters}
                onFiltersChange={setLocalFilters}
                onApplyFilters={applyFilters}
                onClearFilters={clearFilters}
            />
        </div>
    );
}
