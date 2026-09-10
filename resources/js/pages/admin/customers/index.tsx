import AdminLayout from '@/layouts/admin-layout';
import { DataTable } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/admin';
import { Link } from '@inertiajs/react';
import { Eye, User, Mail, Calendar, Building2 } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import admin from '@/routes/admin';

interface CustomerProps {
    customers: {
        data: Array<{
            id: number;
            name: string;
            email: string;
            is_admin: boolean;
            email_verified_at: string | null;
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
    };
}

export default function CustomerIndex() {
    const { props } = usePage() as { props: CustomerProps };
    const { customers, filters } = props;
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');

    const breadcrumbs = [
        { title: 'Customers', href: admin.customers.index.url() },
    ];

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        router.get(admin.customers.index.url(), { 
            search: term
        }, { 
            preserveState: true,
            replace: true 
        });
    };

    const columns = [
        {
            key: 'customer',
            header: 'Customer',
            cell: (row: any) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <div className="font-medium">{row.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {row.email}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            cell: (row: any) => (
                <div className="flex items-center gap-2">
                    {row.is_admin ? (
                        <Badge variant="default">Admin</Badge>
                    ) : (
                        <Badge variant="outline">Customer</Badge>
                    )}
                    {row.email_verified_at ? (
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                    ) : (
                        <Badge variant="outline" className="text-xs">Unverified</Badge>
                    )}
                </div>
            ),
        },
        {
            key: 'joined',
            header: 'Joined',
            cell: (row: any) => (
                <div className="text-sm">
                    {new Date(row.created_at).toLocaleDateString()}
                </div>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            cell: (row: any) => (
                <div className="flex items-center gap-2">
                    <Link href={admin.customers.show.url({ customer: row.id })}>
                        <Button variant="ghost" size="sm" title="View">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage customer accounts and information
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <SearchBar 
                        placeholder="Search customers..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <DataTable
                    data={customers.data}
                    columns={columns}
                    pagination={customers.links}
                    emptyMessage="No customers found"
                />
            </div>
        </AdminLayout>
    );
}