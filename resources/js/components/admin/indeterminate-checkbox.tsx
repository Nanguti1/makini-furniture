import { Checkbox } from '@/components/ui/checkbox';
import { forwardRef, useEffect, useRef } from 'react';

interface IndeterminateCheckboxProps extends React.ComponentProps<typeof Checkbox> {
    indeterminate?: boolean;
}

export const IndeterminateCheckbox = forwardRef<HTMLButtonElement, IndeterminateCheckboxProps>(
    ({ indeterminate = false, ...props }, ref) => {
        const internalRef = useRef<HTMLButtonElement>(null);
        const resolvedRef = (ref as React.RefObject<HTMLButtonElement>) || internalRef;

        useEffect(() => {
            if (resolvedRef.current) {
                const checkbox = resolvedRef.current.querySelector('input[type="checkbox"]') as HTMLInputElement;
                if (checkbox) {
                    checkbox.indeterminate = indeterminate;
                }
            }
        }, [indeterminate, resolvedRef]);

        return <Checkbox ref={resolvedRef} {...props} />;
    }
);

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';