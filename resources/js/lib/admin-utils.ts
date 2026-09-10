import { usePage } from '@inertiajs/react';

/**
 * Check if the current user is authenticated
 */
export function useAuth() {
    const page = usePage();
    return (page.props as any).auth?.user || null;
}

/**
 * Check if the current user is an admin
 */
export function useIsAdmin() {
    const user = useAuth();
    return user?.is_admin === true;
}

/**
 * Format currency for admin display
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
}

/**
 * Format date for admin display
 */
export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(date));
}

/**
 * Format datetime for admin display
 */
export function formatDateTime(date: string | Date): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date));
}

/**
 * Get initials from a name
 */
export function getInitials(name?: string): string {
    if (!name) return 'U';
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
}