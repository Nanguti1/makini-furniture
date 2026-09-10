import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';
import StoreLayout from '@/layouts/store-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        const storefrontRoutes = [
            'home',
            'catalog.index',
            'products.show',
            'cart.show',
            'lookbooks.index',
            'lookbooks.show',
            'pages.show',
            'faqs.index',
            'orders.index',
            'orders.show',
        ];

        const accountRoutes = [
            'account.addresses.index',
            'account.wishlist.index',
            'account.orders.index',
            'account.orders.show',
            'account.reviews.index',
            'account.profile',
        ];

        if (storefrontRoutes.includes(name) || accountRoutes.includes(name) || name.startsWith('account.')) {
            return StoreLayout;
        }

        if (name.startsWith('auth/')) {
            return AuthLayout;
        }

        if (name.startsWith('settings/')) {
            return [AppLayout, SettingsLayout];
        }

        return AppLayout;
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
