import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Package, 
    Tags, 
    FolderTree, 
    Layers, 
    Image, 
    Star, 
    ShoppingCart, 
    Users, 
    FileText, 
    HelpCircle, 
    Settings,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import admin from '@/routes/admin';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface NavItem {
    title: string;
    href: string;
    icon: any;
    badge?: number;
}

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: admin.dashboard.url(),
        icon: LayoutDashboard,
    },
    {
        title: 'Products',
        href: admin.products.index.url(),
        icon: Package,
    },
    {
        title: 'Categories',
        href: admin.categories.index.url(),
        icon: Tags,
    },
    {
        title: 'Brands',
        href: admin.brands.index.url(),
        icon: FolderTree,
    },
    {
        title: 'Collections',
        href: admin.collections.index.url(),
        icon: Layers,
    },
    {
        title: 'Product Families',
        href: admin.productFamilies.index.url(),
        icon: Image,
    },
];

const merchandisingNavItems: NavItem[] = [
    {
        title: 'Banners',
        href: admin.banners.index.url(),
        icon: Image,
    },
    {
        title: 'Featured Products',
        href: admin.featuredProducts.index.url(),
        icon: Star,
    },
    {
        title: 'Featured Collections',
        href: admin.featuredCollections.index.url(),
        icon: Layers,
    },
    {
        title: 'Lookbooks',
        href: admin.lookbooks.index.url(),
        icon: Image,
    },
];

const contentNavItems: NavItem[] = [
    {
        title: 'Orders',
        href: admin.orders.index.url(),
        icon: ShoppingCart,
    },
    {
        title: 'Customers',
        href: admin.customers.index.url(),
        icon: Users,
    },
    {
        title: 'Pages',
        href: admin.pages.index.url(),
        icon: FileText,
    },
    {
        title: 'FAQs',
        href: admin.faqs.index.url(),
        icon: HelpCircle,
    },
];

const settingsNavItems: NavItem[] = [
    {
        title: 'Store Settings',
        href: admin.settings.index.url(),
        icon: Settings,
    },
];

export function AdminSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const url = usePage().url;

    const isActive = (href: string) => {
        return url === href || url.startsWith(href + '/');
    };

    const NavSection = ({ title, items }: { title: string; items: NavItem[] }) => (
        <div className="space-y-1">
            <p className={`px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 ${collapsed ? 'text-center' : ''}`}>
                {collapsed ? title[0] : title}
            </p>
            {items.map((item) => {
                const Icon = item.icon;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                            isActive(item.href)
                                ? 'bg-primary text-primary-foreground'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        aria-current={isActive(item.href) ? 'page' : undefined}
                    >
                        <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        {!collapsed && (
                            <>
                                <span className="flex-1">{item.title}</span>
                                {item.badge && (
                                    <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full" aria-label={`${item.badge} items`}>
                                        {item.badge}
                                    </span>
                                )}
                            </>
                        )}
                    </Link>
                );
            })}
        </div>
    );

    return (
        <div className={`fixed left-0 top-0 z-50 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
            collapsed ? 'w-16' : 'w-64'
        }`}>
            <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    {!collapsed && (
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            Makini Admin
                        </span>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCollapsed(!collapsed)}
                        className="ml-auto"
                    >
                        {collapsed ? (
                            <ChevronRight className="h-4 w-4" />
                        ) : (
                            <ChevronLeft className="h-4 w-4" />
                        )}
                    </Button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-4 space-y-6 px-2">
                    <NavSection title="Overview" items={mainNavItems} />
                    <Separator />
                    <NavSection title="Merchandising" items={merchandisingNavItems} />
                    <Separator />
                    <NavSection title="Content" items={contentNavItems} />
                    <Separator />
                    <NavSection title="Settings" items={settingsNavItems} />
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        {!collapsed && <span>View Store</span>}
                    </Link>
                </div>
            </div>
        </div>
    );
}