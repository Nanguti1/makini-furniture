import AdminLayout from '@/layouts/admin-layout';
import { DataTable } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { Plus, Edit, Trash2, Layers } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import admin from '@/routes/admin';

interface FeaturedCollectionProps {
    featuredCollections: {
        data: Array<{
            id: number;
            collection_id: number;
            placement: string;
            sort_order: number;
            starts_at: string | null;
            ends_at: string | null;
            is_active: boolean;
            created_at: string;
            collection?: {
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

export default function FeaturedCollectionIndex() {
    const { props } = usePage() as { props: FeaturedCollectionProps };
    const { featuredCollections } = props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const breadcrumbs = [
        { title: 'Merchandising', href: '#' },
        { title: 'Featured Collections', href: admin.featuredCollections.index.url() },
    ];

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to remove this featured collection?')) {
            router.delete(admin.featuredCollections.destroy.url({ id }));
        }
    };

    const columns = [
        {
            key: 'collection',
            header: 'Collection',
            cell: (row: any) => (
                <div>
                    <div className="font-medium">{row.collection?.name || 'Unknown'}</div>
                    <div className="text-sm text-muted-foreground">{row.collection?.slug || '-'}</div>
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
                    <Link href={admin.featuredCollections.edit.url({ id: row.id })}>
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
                        <h1 className="text-3xl font-bold tracking-tight">Featured Collections</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage featured collections across your store
                        </p>
                    </div>
                    <Link href={admin.featuredCollections.create.url()}>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Feature Collection
                        </Button>
                    </Link>
                </div>

                <DataTable
                    data={featuredCollections.data}
                    columns={columns}
                    pagination={featuredCollections.links}
                    emptyMessage="No featured collections found"
                />
            </div>
        </AdminLayout>
    );
}