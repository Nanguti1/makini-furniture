import { usePage } from '@inertiajs/react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminTopNav } from '@/components/admin/admin-top-nav';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { BreadcrumbItem } from '@/types';

interface AdminLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AdminLayout({ children, breadcrumbs = [] }: AdminLayoutProps) {
    const page = usePage();
    const { auth } = page.props as { auth: { user: { name?: string; email?: string } } };
    const pageBreadcrumbs = (page.props as any).breadcrumbs as BreadcrumbItem[] | undefined;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Use breadcrumbs from props if not provided directly
    const breadcrumbsToRender = breadcrumbs.length > 0 ? breadcrumbs : pageBreadcrumbs || [];

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block fixed left-0 top-0 h-full z-40">
                <AdminSidebar onCollapsedChange={setSidebarCollapsed} />
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <div className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold">Makini Admin</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="p-4">
                            <AdminSidebar mobile={true} onClose={() => setMobileMenuOpen(false)} />
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
                <AdminTopNav user={auth.user} onMobileMenuClick={() => setMobileMenuOpen(true)} />
                <main className="p-6">
                    <div className="mb-6">
                        <Breadcrumbs breadcrumbs={breadcrumbsToRender} />
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
}