import { DataTable } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import {
    Plus,
    Edit,
    Trash2
} from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import admin from '@/routes/admin';

interface RoleProps {
    roles: {
        data: Array<{
            id: number;
            name: string;
            permissions: Array<{
                id: number;
                name: string;
            }>;
        }>;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}

export default function RoleIndex() {
    const { props } = usePage() as unknown as { props: RoleProps };
    const { roles } = props;

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this role?')) {
            router.delete(admin.roles.destroy.url({ role: id }));
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
            key: 'permissions',
            header: 'Permissions',
            cell: (row: any) => (
                <div className="flex flex-wrap gap-1">
                    {row.permissions && row.permissions.length > 0 ? (
                        row.permissions.slice(0, 3).map((permission: any) => (
                            <Badge key={permission.id} variant="outline" className="text-xs">
                                {permission.name}
                            </Badge>
                        ))
                    ) : (
                        <span className="text-sm text-muted-foreground">No permissions</span>
                    )}
                    {row.permissions && row.permissions.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                            +{row.permissions.length - 3} more
                        </Badge>
                    )}
                </div>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            cell: (row: any) => (
                <div className="flex items-center gap-2">
                    <Link href={admin.roles.edit.url({ role: row.id })}>
                        <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Link>
                    {row.name !== 'Super Admin' && (
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

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Roles</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage user roles and their permissions
                    </p>
                </div>
                <Link href={admin.roles.create.url()}>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Role
                    </Button>
                </Link>
            </div>

            <DataTable
                data={roles.data}
                columns={columns}
                pagination={roles.links}
                emptyMessage="No roles found"
            />
        </div>
    );
}