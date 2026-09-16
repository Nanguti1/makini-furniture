import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import admin from '@/routes/admin';

interface RoleEditProps {
    role: {
        id: number;
        name: string;
        permissions: Array<{
            id: number;
            name: string;
        }>;
    };
    permissions: Array<{
        id: number;
        name: string;
    }>;
}

export default function RoleEdit({ role, permissions }: RoleEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        permissions: role.permissions.map(p => p.id),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.roles.update.url({ role: role.id }));
    };

    const handlePermissionToggle = (permissionId: number) => {
        if (data.permissions.includes(permissionId)) {
            setData('permissions', data.permissions.filter(id => id !== permissionId));
        } else {
            setData('permissions', [...data.permissions, permissionId]);
        }
    };

    // Group permissions by category
    const groupedPermissions = permissions.reduce((acc, permission) => {
        const category = permission.name.split(' ')[0]; // First word as category
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(permission);
        return acc;
    }, {} as Record<string, typeof permissions>);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Role</h1>
                    <p className="text-muted-foreground mt-2">
                        Update role information and permissions
                    </p>
                </div>
                <Link href={admin.roles.index.url()}>
                    <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Roles
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Role Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name *</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Role name"
                                required
                                disabled={role.name === 'Super Admin'}
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name}</p>
                            )}
                            {role.name === 'Super Admin' && (
                                <p className="text-sm text-muted-foreground">
                                    Super Admin role name cannot be changed
                                </p>
                            )}
                        </div>

                        <div className="space-y-4">
                            <Label>Permissions</Label>
                            {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                                <div key={category} className="space-y-2">
                                    <h3 className="font-medium text-sm capitalize">{category}</h3>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        {categoryPermissions.map((permission) => (
                                            <div key={permission.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`permission-${permission.id}`}
                                                    checked={data.permissions.includes(permission.id)}
                                                    onCheckedChange={() => handlePermissionToggle(permission.id)}
                                                    disabled={role.name === 'Super Admin'}
                                                />
                                                <Label
                                                    htmlFor={`permission-${permission.id}`}
                                                    className="text-sm font-normal cursor-pointer"
                                                >
                                                    {permission.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {role.name === 'Super Admin' && (
                                <p className="text-sm text-muted-foreground">
                                    Super Admin permissions cannot be modified
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-4">
                            <Link href={admin.roles.index.url()}>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing || role.name === 'Super Admin'}>
                                {processing ? 'Updating...' : 'Update Role'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}