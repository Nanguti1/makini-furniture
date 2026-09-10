import { Inbox, Package, ShoppingCart, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
    icon?: 'inbox' | 'package' | 'shopping-cart' | 'search' | 'custom';
    customIcon?: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}

const icons = {
    inbox: Inbox,
    package: Package,
    'shopping-cart': ShoppingCart,
    search: Search,
};

export default function EmptyState({
    icon = 'inbox',
    customIcon,
    title,
    description,
    action,
    className,
}: EmptyStateProps) {
    const IconComponent = icon !== 'custom' ? icons[icon] : null;

    return (
        <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
            <div className="flex size-16 items-center justify-center rounded-full bg-muted/50 mb-4">
                {customIcon || (IconComponent && <IconComponent className="size-8 text-muted-foreground" />)}
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            {description && (
                <p className="text-muted-foreground text-sm max-w-sm mb-6">{description}</p>
            )}
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
}
