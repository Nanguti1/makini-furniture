import AdminLayout from '@/layouts/admin-layout';
import { DataTable } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/admin';
import { BulkActionBar } from '@/components/admin';
import { Link } from '@inertiajs/react';
import { 
    Plus, 
    Edit, 
    Trash2,
    ArchiveRestore
} from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import admin from '@/routes/admin';

interface BrandProps {
    brands: {
        data: Array<{
            id: number;
            name: string;
            slug: string;
            description: string | null;
            short_description: string | null;
            logo: string | null;
            cover_image: string | null;
            website_url: string | null;
            is_active: boolean;
            sort_order: number;
            created_at: string;
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
    };
}

export default function BrandIndex() {
    const { props } = usePage() as unknown as { props: BrandProps };
    const { brands, filters } = props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');

    const breadcrumbs = [
        { title: 'Brands', href: admin.brands.index.url() },
    ];

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        router.get(admin.brands.index.url(), { 
            search: term, 
            status: statusFilter 
        }, { 
            preserveState: true,
            replace: true 
        });
    };

    const handleStatusFilter = (status: string) => {
        setStatusFilter(status);
        router.get(admin.brands.index.url(), { 
            search: searchTerm, 
            status 
        }, { 
            preserveState: true,
            replace: true 
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this brand?')) {
            router.delete(admin.brands.destroy.url({ brand: id }));
        }
    };

    const handleRestore = (id: number) => {
        router.post(admin.brands.restore.url({ id }));
    };

    const handleBulkDelete = () => {
        if (confirm(`Are you sure you want to delete ${selectedIds.length} brands?`)) {
            selectedIds.forEach(id => {
                router.delete(admin.brands.destroy.url({ brand: id }));
            });
            setSelectedIds([]);
        }
    };

    const handleBulkRestore = () => {
        selectedIds.forEach(id => {
            router.post(admin.brands.restore.url({ id }));
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
            cell: (row: any) => (
                <div>
                    <div className="font-medium">{row.name}</div>
                    <div className="text-sm text-muted-foreground">{row.slug}</div>
                </div>
            ),
        },
        {
            key: 'description',
            header: 'Description',
            cell: (row: any) => (
                <div className="max-w-xs truncate text-sm text-muted-foreground">
                    {row.short_description || row.description || '-'}
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
                    <Link href={admin.brands.edit.url({ brand: row.id })}>
                        <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Link>
                    {row.deleted_at ? (
                        <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRestore(row.id)}
                        >
                            <ArchiveRestore className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(row.id)}
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
            label: 'Restore Selected',
            value: 'restore',
            destructive: false,
        },
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Brands</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage your product brands
                        </p>
                    </div>
                    <Link href={admin.brands.create.url()}>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Brand
                        </Button>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <SearchBar 
                        placeholder="Search brands..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => handleStatusFilter(e.target.value)}
                        className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="trashed">Trashed</option>
                    </select>
                </div>

                {selectedIds.length > 0 && (
                    <BulkActionBar 
                        selectedCount={selectedIds.length}
                        actions={bulkActions}
                        onAction={(action: string) => {
                            if (action === 'delete') {
                                handleBulkDelete();
                            } else if (action === 'restore') {
                                handleBulkRestore();
                            }
                        }}
                        onClearSelection={() => setSelectedIds([])}
                    />
                )}

                <DataTable
                    data={brands.data}
                    columns={columns}
                    pagination={brands.links}
                    emptyMessage="No brands found"
                />
            </div>
        </AdminLayout>
    );
}