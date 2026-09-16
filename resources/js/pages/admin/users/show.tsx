import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Mail, Calendar, Shield } from 'lucide-react';
import admin from '@/routes/admin';

interface UserShowProps {
    user: {
        id: number;
        name: string;
        email: string;
        created_at: string;
        updated_at: string;
        roles: Array<{
            id: number;
            name: string;
            permissions: Array<{
                id: number;
                name: string;
            }>;
        }>;
    };
}

export default function UserShow({ user }: UserShowProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
                    <p className="text-muted-foreground mt-2">
                        View user information and permissions
                    </p>
                </div>
                <Link href={admin.users.index.url()}>
                    <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Users
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-medium">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Created</p>
                                <p className="font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Last Updated</p>
                                <p className="font-medium">{new Date(user.updated_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Roles</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {user.roles && user.roles.length > 0 ? (
                                user.roles.map((role) => (
                                    <Badge key={role.id} variant="outline" className="text-sm">
                                        <Shield className="h-3 w-3 mr-1" />
                                        {role.name}
                                    </Badge>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">No roles assigned</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {user.roles && user.roles.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Permissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {user.roles.flatMap(role => role.permissions).map((permission) => (
                                <Badge key={permission.id} variant="secondary" className="text-xs">
                                    {permission.name}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="flex items-center justify-end gap-4">
                <Link href={admin.users.edit.url({ user: user.id })}>
                    <Button>
                        Edit User
                    </Button>
                </Link>
            </div>
        </div>
    );
}