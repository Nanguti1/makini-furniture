import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';
import StoreLayout from '@/layouts/store-layout';
import AdminLayout from '@/layouts/admin-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        // Admin routes - use AdminLayout with sidebar (check first to avoid conflicts)
        if (name?.startsWith('admin/') || name?.startsWith('Admin/')) {
            return AdminLayout;
        }

        // Auth routes - use AuthLayout
        if (name?.startsWith('auth/')) {
            return AuthLayout;
        }

        // Settings routes - use SettingsLayout
        if (name?.startsWith('settings/')) {
            return [AppLayout, SettingsLayout];
        }

        // All other routes (storefront, account, etc.) - use StoreLayout (no sidebar)
        return StoreLayout;
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
