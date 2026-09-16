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

interface UserProps {
    users: {
        data: Array<{
            id: number;
            name: string;
            email: string;
            roles: Array<{
                id: number;
                name: string;
            }>;
            created_at: string;
        }>;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    roles: Array<{
        id: number;
        name: string;
    }>;
    filters?: {
        search?: string;
        role?: string;
    };
}

export default function UserIndex() {
    const { props } = usePage() as unknown as { props: UserProps };
    const { users, roles, filters } = props;
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [roleFilter, setRoleFilter] = useState(filters?.role || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(admin.users.index.url(), {
            search: searchTerm,
            role: roleFilter,
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(admin.users.destroy.url({ user: id }));
        }
    };

    const columns = [
        {
            key: 'name',
            header: 'Name',
            cell: (row: any) => (
                <div>
                    <div className="font-medium">{row.name}</div>
                    <div className="text-sm text-muted-foreground">{row.email}</div>
                </div>
            ),
        },
        {
            key: 'roles',
            header: 'Roles',
            cell: (row: any) => (
                <div className="flex flex-wrap gap-1">
                    {row.roles && row.roles.length > 0 ? (
                        row.roles.map((role: any) => (
                            <Badge key={role.id} variant="outline" className="text-xs">
                                {role.name}
                            </Badge>
                        ))
                    ) : (
                        <span className="text-sm text-muted-foreground">No roles</span>
                    )}
                </div>
            ),
        },
        {
            key: 'created_at',
            header: 'Created',
            cell: (row: any) => (
                <div className="text-sm text-muted-foreground">
                    {new Date(row.created_at).toLocaleDateString()}
                </div>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            cell: (row: any) => (
                <div className="flex items-center gap-2">
                    <Link href={admin.users.show.url({ user: row.id })}>
                        <Button variant="ghost" size="sm">
                            View
                        </Button>
                    </Link>
                    <Link href={admin.users.edit.url({ user: row.id })}>
                        <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Link>
                    {!row.roles?.some((r: any) => r.name === 'Super Admin') && (
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
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage system users and their roles
                    </p>
                </div>
                <Link href={admin.users.create.url()}>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add User
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        <option value="">All Roles</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                    <Button type="submit">Search</Button>
                </form>
            </div>

            <DataTable
                data={users.data}
                columns={columns}
                pagination={users.links}
                emptyMessage="No users found"
            />
        </div>
    );
}