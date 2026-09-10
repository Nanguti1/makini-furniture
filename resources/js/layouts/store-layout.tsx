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
                {children}
            </main>
            <StoreFooter />
        </div>
    );
}
