import AdminLayout from '@/layouts/admin-layout';
import { DataTable } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import admin from '@/routes/admin';

interface FeaturedProductProps {
    featuredProducts: {
        data: Array<{
            id: number;
            product_id: number;
            placement: string;
            sort_order: number;
            starts_at: string | null;
            ends_at: string | null;
            is_active: boolean;
            created_at: string;
            product?: {
                id: number;
                name: string;
                slug: string;
            };
        }>;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}

export default function FeaturedProductIndex() {
    const { props } = usePage() as { props: FeaturedProductProps };
    const { featuredProducts } = props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const breadcrumbs = [
        { title: 'Merchandising', href: '#' },
        { title: 'Featured Products', href: admin.featuredProducts.index.url() },
    ];

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to remove this featured product?')) {
            router.delete(admin.featuredProducts.destroy.url({ id }));
        }
    };

    const columns = [
        {
            key: 'product',
            header: 'Product',
            cell: (row: any) => (
                <div>
                    <div className="font-medium">{row.product?.name || 'Unknown'}</div>
                    <div className="text-sm text-muted-foreground">{row.product?.slug || '-'}</div>
                </div>
            ),
        },
        {
            key: 'placement',
            header: 'Placement',
            cell: (row: any) => (
                <Badge variant="outline">{row.placement}</Badge>
            ),
        },
        {
            key: 'schedule',
            header: 'Schedule',
            cell: (row: any) => (
                <div className="text-sm">
                    {row.starts_at && (
                        <div>From: {new Date(row.starts_at).toLocaleDateString()}</div>
                    )}
                    {row.ends_at && (
                        <div>To: {new Date(row.ends_at).toLocaleDateString()}</div>
                    )}
                    {!row.starts_at && !row.ends_at && <div>-</div>}
                </div>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            cell: (row: any) => (
                <Badge variant={row.is_active ? 'default' : 'secondary'}>
                    {row.is_active ? 'Active' : 'Inactive'}
                </Badge>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            cell: (row: any) => (
                <div className="flex items-center gap-2">
                    <Link href={admin.featuredProducts.edit.url({ id: row.id })}>
                        <Button variant="ghost" size="sm" title="Edit">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(row.id)}
                        title="Remove"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Featured Products</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage featured products across your store
                        </p>
                    </div>
                    <Link href={admin.featuredProducts.create.url()}>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Feature Product
                        </Button>
                    </Link>
                </div>

                <DataTable
                    data={featuredProducts.data}
                    columns={columns}
                    pagination={featuredProducts.links}
                    emptyMessage="No featured products found"
                />
            </div>
        </AdminLayout>
    );
}