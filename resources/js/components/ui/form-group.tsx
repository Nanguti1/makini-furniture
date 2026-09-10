import { cn } from '@/lib/utils';

interface FormGroupProps {
    children: React.ReactNode;
    className?: string;
}

export default function FormGroup({ children, className }: FormGroupProps) {
    return (
        <div className={cn('space-y-4', className)}>
            {children}
        </div>
    );
}
