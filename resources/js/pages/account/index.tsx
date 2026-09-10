import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, ShoppingBag, Heart, MapPin, LogOut, Settings, ChevronRight } from 'lucide-react';
import { router } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

interface AccountSection {
    title: string;
    description: string;
    icon: React.ElementType;
    href: string;
    count: number | null;
}

interface AccountIndexProps {
    auth: {
        user: User;
    };
}

export default function AccountIndexPage({ auth }: AccountIndexProps) {
    const user = auth.user;

    const handleLogout = () => {
        if (confirm('Are you sure you want to log out?')) {
            // Use form submission for Laravel Fortify logout
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/logout';
            
            // Add CSRF token
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            if (csrfToken) {
                const csrfInput = document.createElement('input');
                csrfInput.type = 'hidden';
                csrfInput.name = '_token';
                csrfInput.value = csrfToken;
                form.appendChild(csrfInput);
            }
            
            document.body.appendChild(form);
            form.submit();
        }
    };

    const accountSections = [
        {
            title: 'Orders',
            description: 'View your order history and track shipments',
            icon: ShoppingBag,
            href: '/account/orders',
            count: null, // Could be fetched from backend
        },
        {
            title: 'Wishlist',
            description: 'View your saved items',
            icon: Heart,
            href: '/account/wishlist',
            count: null, // Could be fetched from backend
        },
        {
            title: 'Addresses',
            description: 'Manage your shipping addresses',
            icon: MapPin,
            href: '/account/addresses',
            count: null, // Could be fetched from backend
        },
        {
            title: 'Profile Settings',
            description: 'Update your profile information',
            icon: User,
            href: '/account/profile',
            count: null,
        },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">My Account</h1>
                <p className="text-muted-foreground">
                    Welcome back, {user.name}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Profile
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-primary">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-semibold">{user.name}</h3>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Email Verified</span>
                                    <span className={user.email_verified_at ? 'text-green-600' : 'text-amber-600'}>
                                        {user.email_verified_at ? 'Yes' : 'No'}
                                    </span>
                                </div>
                            </div>

                            <Separator />

                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Log Out
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Account Sections */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
                    
                    {accountSections.map((section) => (
                        <a
                            key={section.href}
                            href={section.href}
                            className="block"
                        >
                            <Card className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <section.icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{section.title}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {section.description}
                                                </p>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                </CardContent>
                            </Card>
                        </a>
                    ))}

                    {/* Quick Actions */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <a
                                href="/catalog"
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                                    <span>Continue Shopping</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </a>
                            <a
                                href="/cart"
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                                    <span>View Cart</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
