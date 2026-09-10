import StoreHeader from '@/components/store/store-header';
import StoreFooter from '@/components/store/store-footer';

interface StoreLayoutProps {
    children: React.ReactNode;
}

export default function StoreLayout({ children }: StoreLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <StoreHeader />
            <main className="flex-1">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </div>
            </main>
            <StoreFooter />
        </div>
    );
}
