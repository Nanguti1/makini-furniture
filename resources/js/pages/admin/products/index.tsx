import AdminLayout from '@/layouts/admin-layout';
import { DataTable } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/admin';
import { BulkActionBar } from '@/components/admin/bulk-action-bar';
import { Link } from '@inertiajs/react';
import { 
    Plus, 
    Edit, 
    Trash2,
    Eye,
    Check,
    X,
    Star
} from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import admin from '@/routes/admin';

interface ProductProps {
    products: {
        data: Array<{
            id: number;
            name: string;
            slug: string;
            sku: string | null;
            short_description: string | null;
            status: string;
            is_featured: boolean;
            is_new: boolean;
            is_bestseller: boolean;
            is_active: boolean;
            brand?: {
                id: number;
                name: string;
            };
            category?: {
                id: number;
                name: string;
            };
            product_family?: {
                id: number;
                name: string;
            };
            created_at: string;
            updated_at: string;
            deleted_at: string | null;
        }>;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    filters?: {
        search?: string;
        status?: string;
        featured?: string;
        sort?: string;
        direction?: string;
    };
}

export default function ProductIndex() {
    const { props } = usePage() as { props: ProductProps };
    const { products, filters } = props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');
    const [featuredFilter, setFeaturedFilter] = useState(filters?.featured || 'all');
    const [sortColumn, setSortColumn] = useState(filters?.sort || 'created_at');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(filters?.direction as 'asc' | 'desc' || 'desc');

    const breadcrumbs = [
        { title: 'Products', href: admin.products.index.url() },
    ];

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        router.get(admin.products.index.url(), {
            search: term,
            status: statusFilter,
            featured: featuredFilter,
            sort: sortColumn,
            direction: sortDirection
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleStatusFilter = (status: string) => {
        setStatusFilter(status);
        router.get(admin.products.index.url(), {
            search: searchTerm,
            status,
            featured: featuredFilter,
            sort: sortColumn,
            direction: sortDirection
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleFeaturedFilter = (featured: string) => {
        setFeaturedFilter(featured);
        router.get(admin.products.index.url(), {
            search: searchTerm,
            status: statusFilter,
            featured,
            sort: sortColumn,
            direction: sortDirection
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleSort = (column: string, direction: 'asc' | 'desc') => {
        setSortColumn(column);
        setSortDirection(direction);
        router.get(admin.products.index.url(), {
            search: searchTerm,
            status: statusFilter,
            featured: featuredFilter,
            sort: column,
            direction
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleDelete = (slug: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(admin.products.destroy.url({ product: slug }));
        }
    };

    const handlePublish = (slug: string) => {
        router.post(admin.products.publish.url({ product: slug }));
    };

    const handleUnpublish = (slug: string) => {
        router.post(admin.products.unpublish.url({ product: slug }));
    };

    const handleBulkDelete = () => {
        if (confirm(`Are you sure you want to delete ${selectedIds.length} products?`)) {
            selectedIds.forEach(id => {
                const product = products.data.find(p => p.id === id);
                if (product) {
                    router.delete(admin.products.destroy.url({ product: product.slug }));
                }
            });
            setSelectedIds([]);
        }
    };

    const handleBulkPublish = () => {
        selectedIds.forEach(id => {
            const product = products.data.find(p => p.id === id);
            if (product) {
                router.post(admin.products.publish.url({ product: product.slug }));
            }
        });
        setSelectedIds([]);
    };

    const columns = [
        {
            key: 'select',
            header: '',
            cell: (row: any) => (
                <input
                    type="checkbox"
                    checked={selectedIds.includes(row.id)}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setSelectedIds([...selectedIds, row.id]);
                        } else {
                            setSelectedIds(selectedIds.filter(id => id !== row.id));
                        }
                    }}
                    className="rounded border-gray-300"
                />
            ),
        },
        {
            key: 'name',
            header: 'Name',
            sortable: true,
            cell: (row: any) => (
                <div>
                    <div className="font-medium">{row.name}</div>
                    <div className="text-sm text-muted-foreground">{row.sku || row.slug}</div>
                </div>
            ),
        },
        {
            key: 'brand',
            header: 'Brand',
            cell: (row: any) => (
                <div className="text-sm">
                    {row.brand ? row.brand.name : '-'}
                </div>
            ),
        },
        {
            key: 'category',
            header: 'Category',
            cell: (row: any) => (
                <div className="text-sm">
                    {row.category ? row.category.name : '-'}
                </div>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            sortable: true,
            cell: (row: any) => (
                <Badge variant={row.status === 'published' ? 'default' : 'secondary'}>
                    {row.status}
                </Badge>
            ),
        },
        {
            key: 'badges',
            header: 'Badges',
            cell: (row: any) => (
                <div className="flex items-center gap-1">
                    {row.is_featured && <Star className="h-4 w-4 text-yellow-500" />}
                    {row.is_new && <Badge variant="outline" className="text-xs">New</Badge>}
                    {row.is_bestseller && <Badge variant="outline" className="text-xs">Bestseller</Badge>}
                </div>
            ),
        },
        {
            key: 'active',
            header: 'Active',
            cell: (row: any) => (
                row.is_active ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-gray-400" />
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            cell: (row: any) => (
                <div className="flex items-center gap-2">
                    <Link href={admin.products.show.url({ product: row.slug })}>
                        <Button variant="ghost" size="sm" title="View">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href={admin.products.edit.url({ product: row.slug })}>
                        <Button variant="ghost" size="sm" title="Edit">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Link>
                    {row.status === 'published' ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUnpublish(row.slug)}
                            title="Unpublish"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePublish(row.slug)}
                            title="Publish"
                        >
                            <Check className="h-4 w-4" />
                        </Button>
                    )}
                    {!row.deleted_at && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(row.slug)}
                            title="Delete"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    const bulkActions = [
        {
            label: 'Delete Selected',
            value: 'delete',
            destructive: true,
        },
        {
            label: 'Publish Selected',
            value: 'publish',
            destructive: false,
        },
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage your product catalog
                        </p>
                    </div>
                    <Link href={admin.products.create.url()}>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Product
                        </Button>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <SearchBar 
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => handleStatusFilter(e.target.value)}
                        className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                    </select>
                    <select
                        value={featuredFilter}
                        onChange={(e) => handleFeaturedFilter(e.target.value)}
                        className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        <option value="all">All Products</option>
                        <option value="featured">Featured</option>
                        <option value="new">New</option>
                        <option value="bestseller">Bestsellers</option>
                    </select>
                </div>

                {selectedIds.length > 0 && (
                    <BulkActionBar 
                        selectedCount={selectedIds.length}
                        actions={bulkActions}
                        onAction={(action: string) => {
                            if (action === 'delete') {
                                handleBulkDelete();
                            } else if (action === 'publish') {
                                handleBulkPublish();
                            }
                        }}
                        onClearSelection={() => setSelectedIds([])}
                    />
                )}

                <DataTable
                    data={products.data}
                    columns={columns}
                    onSort={handleSort}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    pagination={products.links}
                    emptyMessage="No products found"
                />
            </div>
        </AdminLayout>
    );
}