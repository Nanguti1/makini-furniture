import AdminLayout from '@/layouts/admin-layout';
import { DataTable } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/admin';
import { Link } from '@inertiajs/react';
import { Plus, Edit, Trash2, HelpCircle, Check, X, ArrowUp, ArrowDown } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import admin from '@/routes/admin';

interface FAQsProps {
    faqs: {
        data: Array<{
            id: number;
            question: string;
            answer: string;
            category: string | null;
            is_active: boolean;
            sort_order: number;
            created_at: string;
            updated_at: string;
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

export default function FAQsIndex() {
    const { props } = usePage() as unknown as { props: FAQsProps };
    const { faqs, filters } = props;
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');

    const breadcrumbs = [
        { title: 'FAQs', href: admin.faqs.index.url() },
    ];

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        router.get(admin.faqs.index.url(), { 
            search: term, 
            status: statusFilter
        }, { 
            preserveState: true,
            replace: true 
        });
    };

    const handleStatusFilter = (status: string) => {
        setStatusFilter(status);
        router.get(admin.faqs.index.url(), { 
            search: searchTerm, 
            status
        }, { 
            preserveState: true,
            replace: true 
        });
    };

    const handleDelete = (faqId: number) => {
        if (confirm('Are you sure you want to delete this FAQ?')) {
            router.delete(admin.faqs.destroy.url({ faq: faqId }));
        }
    };

    const handleActivate = (faqId: number) => {
        router.post(admin.faqs.activate.url({ faq: faqId }));
    };

    const handleDeactivate = (faqId: number) => {
        router.post(admin.faqs.deactivate.url({ faq: faqId }));
    };

    const handleReorder = (faqs: number[]) => {
        router.post(admin.faqs.reorder.url(), { faqs });
    };

    const columns = [
        {
            key: 'question',
            header: 'Question',
            cell: (row: any) => (
                <div>
                    <div className="font-medium">{row.question}</div>
                    {row.category && (
                        <div className="text-sm text-muted-foreground">
                            {row.category}
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: 'answer',
            header: 'Answer',
            cell: (row: any) => (
                <div className="text-sm text-muted-foreground max-w-md truncate">
                    {row.answer}
                </div>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            cell: (row: any) => (
                <Badge variant={row.is_active ? 'default' : 'outline'}>
                    {row.is_active ? 'Active' : 'Inactive'}
                </Badge>
            ),
        },
        {
            key: 'order',
            header: 'Order',
            cell: (row: any) => (
                <div className="text-sm">{row.sort_order}</div>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            cell: (row: any) => (
                <div className="flex items-center gap-2">
                    {row.is_active ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeactivate(row.id)}
                            title="Deactivate"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleActivate(row.id)}
                            title="Activate"
                        >
                            <Check className="h-4 w-4" />
                        </Button>
                    )}
                    <Link href={admin.faqs.edit.url({ faq: row.id })}>
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
                        <h1 className="text-3xl font-bold tracking-tight">FAQs</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage frequently asked questions
                        </p>
                    </div>
                    <Link href={admin.faqs.create.url()}>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Create FAQ
                        </Button>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <SearchBar 
                        placeholder="Search FAQs..."
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
                    </select>
                </div>

                <DataTable
                    data={faqs.data}
                    columns={columns}
                    pagination={faqs.links}
                    emptyMessage="No FAQs found"
                />
            </div>
        </AdminLayout>
    );
}