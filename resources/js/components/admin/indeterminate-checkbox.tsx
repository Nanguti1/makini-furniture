import { Checkbox } from '@/components/ui/checkbox';
import { forwardRef, useEffect, useRef } from 'react';

interface IndeterminateCheckboxProps extends React.ComponentProps<typeof Checkbox> {
    indeterminate?: boolean;
}

export const IndeterminateCheckbox = forwardRef<HTMLInputElement, IndeterminateCheckboxProps>(
    ({ indeterminate = false, ...props }, ref) => {
        const internalRef = useRef<HTMLInputElement>(null);
        const resolvedRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

        useEffect(() => {
            if (resolvedRef.current) {
                resolvedRef.current.indeterminate = indeterminate;
            }
        }, [indeterminate, resolvedRef]);

        return <Checkbox ref={resolvedRef} {...props} />;
    }
);

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';