import AdminLayout from '@/layouts/admin-layout';
import { DataTable } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { Plus, Edit, Trash2, Power, PowerOff, GripVertical } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import admin from '@/routes/admin';

interface BannerProps {
    banners: {
        data: Array<{
            id: number;
            title: string;
            subtitle: string | null;
            image: string | null;
            mobile_image: string | null;
            link: string | null;
            link_type: string | null;
            placement: string;
            starts_at: string | null;
            ends_at: string | null;
            is_active: boolean;
            sort_order: number;
            created_at: string;
        }>;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}

export default function BannerIndex() {
    const { props } = usePage() as { props: BannerProps };
    const { banners } = props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const breadcrumbs = [
        { title: 'Merchandising', href: '#' },
        { title: 'Banners', href: admin.banners.index.url() },
    ];

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this banner?')) {
            router.delete(admin.banners.destroy.url({ id }));
        }
    };

    const handleActivate = (id: number) => {
        router.post(admin.banners.activate.url({ id }));
    };

    const handleDeactivate = (id: number) => {
        router.post(admin.banners.deactivate.url({ id }));
    };

    const columns = [
        {
            key: 'title',
            header: 'Title',
            cell: (row: any) => (
                <div>
                    <div className="font-medium">{row.title}</div>
                    <div className="text-sm text-muted-foreground">{row.subtitle || '-'}</div>
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
                    <Link href={admin.banners.edit.url({ id: row.id })}>
                        <Button variant="ghost" size="sm" title="Edit">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Link>
                    {row.is_active ? (
                        <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeactivate(row.id)}
                            title="Deactivate"
                        >
                            <PowerOff className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleActivate(row.id)}
                            title="Activate"
                        >
                            <Power className="h-4 w-4" />
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
                        <h1 className="text-3xl font-bold tracking-tight">Homepage Banners</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage homepage banners and promotional content
                        </p>
                    </div>
                    <Link href={admin.banners.create.url()}>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Banner
                        </Button>
                    </Link>
                </div>

                <DataTable
                    data={banners.data}
                    columns={columns}
                    pagination={banners.links}
                    emptyMessage="No banners found"
                />
            </div>
        </AdminLayout>
    );
}