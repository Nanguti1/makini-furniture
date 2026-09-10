import * as React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface DrawerProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    side?: 'left' | 'right' | 'top' | 'bottom';
    className?: string;
}

function Drawer({ open, onOpenChange, children, side = 'right', className }: DrawerProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side={side} className={cn('w-full sm:max-w-md', className)}>
                {children}
            </SheetContent>
        </Sheet>
    );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <SheetHeader className={cn('px-6', className)} {...props} />
    );
}

function DrawerTitle({ className, ...props }: React.ComponentProps<typeof SheetTitle>) {
    return (
        <SheetTitle className={cn('text-lg font-semibold', className)} {...props} />
    );
}

function DrawerDescription({ className, ...props }: React.ComponentProps<typeof SheetDescription>) {
    return (
        <SheetDescription className={cn('text-sm text-muted-foreground', className)} {...props} />
    );
}

function DrawerBody({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div className={cn('flex-1 overflow-y-auto px-6 py-4', className)} {...props} />
    );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <SheetFooter className={cn('px-6 pb-6', className)} {...props} />
    );
}

export { Drawer, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter };
