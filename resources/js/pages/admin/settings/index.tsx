import AdminLayout from '@/layouts/admin-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Settings as SettingsIcon, Store, Mail, Palette, Globe, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { router, usePage, useForm } from '@inertiajs/react';
import admin from '@/routes/admin';

interface SettingsProps {
    settings?: {
        app_name?: string;
        app_url?: string;
        mail_from_address?: string;
        mail_from_name?: string;
        social_facebook?: string;
        social_twitter?: string;
        social_instagram?: string;
        social_linkedin?: string;
    };
}

export default function SettingsIndex() {
    const { props } = usePage() as unknown as { props: SettingsProps & { success?: string } };
    const [showSuccess, setShowSuccess] = useState(!!props.success);
    const { data, setData, post, processing, errors } = useForm({
        app_name: props.settings?.app_name || '',
        app_url: props.settings?.app_url || '',
        mail_from_address: props.settings?.mail_from_address || '',
        mail_from_name: props.settings?.mail_from_name || '',
        social_facebook: props.settings?.social_facebook || '',
        social_twitter: props.settings?.social_twitter || '',
        social_instagram: props.settings?.social_instagram || '',
        social_linkedin: props.settings?.social_linkedin || '',
    });

    const breadcrumbs = [
        { title: 'Settings', href: admin.settings.index.url() },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.settings.update.url(), {
            preserveScroll: true,
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            },
        });
    };

    const handleChange = (key: string, value: string) => {
        setData(key, value);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    {showSuccess && (
                        <Alert>
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>
                                Settings updated successfully.
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Store Settings</h1>
                            <p className="text-muted-foreground mt-2">
                                Manage your store configuration and preferences
                            </p>
                        </div>
                        <Button type="submit" disabled={processing}>
                            <Save className="h-4 w-4 mr-2" />
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>

                    <div className="grid gap-6">
                        {/* Store Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Store className="h-5 w-5" />
                                    Store Information
                                </CardTitle>
                                <CardDescription>
                                    Basic information about your store
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="app_name">Store Name</Label>
                                    <Input
                                        id="app_name"
                                        value={data.app_name}
                                        onChange={(e) => handleChange('app_name', e.target.value)}
                                        placeholder="Makini Queens Furniture"
                                    />
                                    {errors.app_name && (
                                        <p className="text-sm text-destructive">{errors.app_name}</p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="app_url">Store URL</Label>
                                    <Input
                                        id="app_url"
                                        value={data.app_url}
                                        onChange={(e) => handleChange('app_url', e.target.value)}
                                        placeholder="https://yourstore.com"
                                    />
                                    {errors.app_url && (
                                        <p className="text-sm text-destructive">{errors.app_url}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mail className="h-5 w-5" />
                                    Contact Information
                                </CardTitle>
                                <CardDescription>
                                    Email and contact settings
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="mail_from_address">From Email Address</Label>
                                    <Input
                                        id="mail_from_address"
                                        type="email"
                                        value={data.mail_from_address}
                                        onChange={(e) => handleChange('mail_from_address', e.target.value)}
                                        placeholder="noreply@yourstore.com"
                                    />
                                    {errors.mail_from_address && (
                                        <p className="text-sm text-destructive">{errors.mail_from_address}</p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="mail_from_name">From Name</Label>
                                    <Input
                                        id="mail_from_name"
                                        value={data.mail_from_name}
                                        onChange={(e) => handleChange('mail_from_name', e.target.value)}
                                        placeholder="Makini Queens Furniture"
                                    />
                                    {errors.mail_from_name && (
                                        <p className="text-sm text-destructive">{errors.mail_from_name}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Social Links */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Globe className="h-5 w-5" />
                                    Social Links
                                </CardTitle>
                                <CardDescription>
                                    Connect your social media accounts
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="social_facebook">Facebook URL</Label>
                                    <Input
                                        id="social_facebook"
                                        value={data.social_facebook}
                                        onChange={(e) => handleChange('social_facebook', e.target.value)}
                                        placeholder="https://facebook.com/yourstore"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="social_twitter">Twitter URL</Label>
                                    <Input
                                        id="social_twitter"
                                        value={data.social_twitter}
                                        onChange={(e) => handleChange('social_twitter', e.target.value)}
                                        placeholder="https://twitter.com/yourstore"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="social_instagram">Instagram URL</Label>
                                    <Input
                                        id="social_instagram"
                                        value={data.social_instagram}
                                        onChange={(e) => handleChange('social_instagram', e.target.value)}
                                        placeholder="https://instagram.com/yourstore"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="social_linkedin">LinkedIn URL</Label>
                                    <Input
                                        id="social_linkedin"
                                        value={data.social_linkedin}
                                        onChange={(e) => handleChange('social_linkedin', e.target.value)}
                                        placeholder="https://linkedin.com/company/yourstore"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}