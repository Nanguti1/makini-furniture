import AdminLayout from '@/layouts/admin-layout';
import { DataTable } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/admin';
import { Link } from '@inertiajs/react';
import { Plus, Eye, Edit, Trash2, FileText, Calendar, Check, X } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import admin from '@/routes/admin';

interface PagesProps {
    pages: {
        data: Array<{
            id: number;
            title: string;
            slug: string;
            status: string;
            published_at: string | null;
            created_at: string;
            updated_at: string;
            sections_count: number;
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

export default function PagesIndex() {
    const { props } = usePage() as unknown as { props: PagesProps };
    const { pages, filters } = props;
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');

    const breadcrumbs = [
        { title: 'Pages', href: admin.pages.index.url() },
    ];

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        router.get(admin.pages.index.url(), { 
            search: term, 
            status: statusFilter
        }, { 
            preserveState: true,
            replace: true 
        });
    };

    const handleStatusFilter = (status: string) => {
        setStatusFilter(status);
        router.get(admin.pages.index.url(), { 
            search: searchTerm, 
            status
        }, { 
            preserveState: true,
            replace: true 
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'default';
            case 'draft':
                return 'outline';
            default:
                return 'secondary';
        }
    };

    const handleDelete = (pageId: number) => {
        if (confirm('Are you sure you want to delete this page?')) {
            router.delete(admin.pages.destroy.url({ page: pageId }));
        }
    };

    const handlePublish = (pageId: number) => {
        router.post(admin.pages.publish.url({ page: pageId }));
    };

    const handleUnpublish = (pageId: number) => {
        router.post(admin.pages.unpublish.url({ page: pageId }));
    };

    const columns = [
        {
            key: 'page',
            header: 'Page',
            cell: (row: any) => (
                <div>
                    <div className="font-medium">{row.title}</div>
                    <div className="text-sm text-muted-foreground">
                        /{row.slug}
                    </div>
                </div>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            cell: (row: any) => (
                <Badge variant={getStatusColor(row.status)}>
                    {row.status}
                </Badge>
            ),
        },
        {
            key: 'sections',
            header: 'Sections',
            cell: (row: any) => (
                <div className="text-sm">{row.sections_count}</div>
            ),
        },
        {
            key: 'published',
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
                    {row.status === 'draft' ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePublish(row.id)}
                            title="Publish"
                        >
                            <Check className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUnpublish(row.id)}
                            title="Unpublish"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                    <Link href={admin.pages.edit.url({ page: row.id })}>
                        <Button variant="ghost" size="sm" title="Edit">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Link>
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
                        <h1 className="text-3xl font-bold tracking-tight">Pages</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage content pages and sections
                        </p>
                    </div>
                    <Link href={admin.pages.create.url()}>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Page
                        </Button>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <SearchBar 
                        placeholder="Search pages..."
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
                    </select>
                </div>

                <DataTable
                    data={pages.data}
                    columns={columns}
                    pagination={pages.links}
                    emptyMessage="No pages found"
                />
            </div>
        </AdminLayout>
    );
}