import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import admin from '@/routes/admin';

interface PermissionEditProps {
    permission: {
        id: number;
        name: string;
    };
}

export default function PermissionEdit({ permission }: PermissionEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: permission.name,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.permissions.update.url({ permission: permission.id }));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Permission</h1>
                    <p className="text-muted-foreground mt-2">
                        Update permission information
                    </p>
                </div>
                <Link href={admin.permissions.index.url()}>
                    <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Permissions
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Permission Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name *</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g., view users, edit products"
                                required
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name}</p>
                            )}
                            <p className="text-sm text-muted-foreground">
                                Use descriptive names like "view users" or "edit products"
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-4">
                            <Link href={admin.permissions.index.url()}>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Permission'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}