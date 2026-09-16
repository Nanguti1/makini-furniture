import { DataTable } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import {
    Plus,
    Edit,
    Trash2
} from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import admin from '@/routes/admin';

interface PermissionProps {
    permissions: {
        data: Array<{
            id: number;
            name: string;
        }>;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}

export default function PermissionIndex() {
    const { props } = usePage() as unknown as { props: PermissionProps };
    const { permissions } = props;

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this permission?')) {
            router.delete(admin.permissions.destroy.url({ permission: id }));
        }
    };

    const columns = [
        {
            key: 'name',
            header: 'Name',
            cell: (row: any) => (
                <div>
                    <div className="font-medium">{row.name}</div>
                </div>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            cell: (row: any) => (
                <div className="flex items-center gap-2">
                    <Link href={admin.permissions.edit.url({ permission: row.id })}>
                        <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(row.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Permissions</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage system permissions
                    </p>
                </div>
                <Link href={admin.permissions.create.url()}>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Permission
                    </Button>
                </Link>
            </div>

            <DataTable
                data={permissions.data}
                columns={columns}
                pagination={permissions.links}
                emptyMessage="No permissions found"
            />
        </div>
    );
}