import AdminLayout from '@/layouts/admin-layout';
import { DataTable } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { Plus, Edit, Trash2, BookOpen, Check, X } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import admin from '@/routes/admin';

interface LookbookProps {
    lookbooks: {
        data: Array<{
            id: number;
            title: string;
            slug: string;
            description: string | null;
            hero_image: string | null;
            status: string;
            published_at: string | null;
            items_count: number;
            created_at: string;
        }>;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}

export default function LookbookIndex() {
    const { props } = usePage() as unknown as { props: LookbookProps };
    const { lookbooks } = props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const breadcrumbs = [
        { title: 'Lookbooks', href: admin.lookbooks.index.url() },
    ];

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this lookbook?')) {
            router.delete(admin.lookbooks.destroy.url({ id }));
        }
    };

    const handlePublish = (id: number) => {
        router.post(admin.lookbooks.publish.url({ id }));
    };

    const handleUnpublish = (id: number) => {
        router.post(admin.lookbooks.unpublish.url({ id }));
    };

    const columns = [
        {
            key: 'title',
            header: 'Title',
            cell: (row: any) => (
                <div>
                    <div className="font-medium">{row.title}</div>
                    <div className="text-sm text-muted-foreground">{row.slug}</div>
                </div>
            ),
        },
        {
            key: 'items',
            header: 'Items',
            cell: (row: any) => (
                <Badge variant="outline">{row.items_count} items</Badge>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            cell: (row: any) => (
                <Badge variant={row.status === 'published' ? 'default' : 'secondary'}>
                    {row.status}
                </Badge>
            ),
        },
        {
            key: 'published_at',
            header: 'Published',
            cell: (row: any) => (
                <div className="text-sm">
                    {row.published_at ? new Date(row.published_at).toLocaleDateString() : '-'}
                </div>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            cell: (row: any) => (
                <div className="flex items-center gap-2">
                    <Link href={admin.lookbooks.edit.url({ id: row.id })}>
                        <Button variant="ghost" size="sm" title="Edit">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Link>
                    {row.status === 'published' ? (
                        <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleUnpublish(row.id)}
                            title="Unpublish"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handlePublish(row.id)}
                            title="Publish"
                        >
                            <Check className="h-4 w-4" />
                        </Button>
                    )}
                    <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(row.id)}
                        title="Delete"
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
                        <h1 className="text-3xl font-bold tracking-tight">Lookbooks</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage curated product collections and style guides
                        </p>
                    </div>
                    <Link href={admin.lookbooks.create.url()}>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Lookbook
                        </Button>
                    </Link>
                </div>

                <DataTable
                    data={lookbooks.data}
                    columns={columns}
                    pagination={lookbooks.links}
                    emptyMessage="No lookbooks found"
                />
            </div>
        </AdminLayout>
    );
}