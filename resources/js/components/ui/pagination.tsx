import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationLinkProps extends React.ComponentProps<'a'> {
    isActive?: boolean;
}

function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
    return (
        <a
            className={cn(
                'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                'disabled:pointer-events-none disabled:opacity-50',
                'h-9 w-9',
                isActive
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-background hover:bg-accent hover:text-accent-foreground',
                className
            )}
            {...props}
        />
    );
}

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
    hrefBuilder?: (page: number) => string;
    showEdges?: boolean;
    siblingCount?: number;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    hrefBuilder,
    showEdges = true,
    siblingCount = 1,
}: PaginationProps) {
    const generatePageNumbers = () => {
        const pages: (number | string)[] = [];
        
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }

        if (showEdges) {
            pages.push(1);
        }

        let startPage = Math.max(2, currentPage - siblingCount);
        let endPage = Math.min(totalPages - 1, currentPage + siblingCount);

        if (currentPage <= siblingCount + 2) {
            endPage = Math.min(totalPages - 1, siblingCount * 2 + 2);
        }

        if (currentPage >= totalPages - siblingCount - 1) {
            startPage = Math.max(2, totalPages - siblingCount * 2 - 1);
        }

        if (startPage > 2) {
            pages.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages - 1) {
            pages.push('...');
        }

        if (showEdges) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = generatePageNumbers();

    const handlePageChange = (page: number) => {
        if (onPageChange) {
            onPageChange(page);
        }
    };

    const buildHref = (page: number) => {
        if (hrefBuilder) {
            return hrefBuilder(page);
        }
        return '#';
    };

    return (
        <div className="flex items-center justify-center gap-2">
            {hrefBuilder ? (
                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    disabled={currentPage === 1}
                    asChild
                >
                    <a href={buildHref(currentPage - 1)}>
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous page</span>
                    </a>
                </Button>
            ) : (
                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous page</span>
                </Button>
            )}

            {pages.map((page, index) => {
                if (typeof page === 'string') {
                    return (
                        <span key={`ellipsis-${index}`} className="flex h-9 w-9 items-center justify-center">
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </span>
                    );
                }

                return (
                    <PaginationLink
                        key={page}
                        isActive={currentPage === page}
                        href={buildHref(page)}
                        onClick={(e) => {
                            if (!hrefBuilder) {
                                e.preventDefault();
                                handlePageChange(page);
                            }
                        }}
                    >
                        {page}
                    </PaginationLink>
                );
            })}

            {hrefBuilder ? (
                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    disabled={currentPage === totalPages}
                    asChild
                >
                    <a href={buildHref(currentPage + 1)}>
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next page</span>
                    </a>
                </Button>
            ) : (
                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next page</span>
                </Button>
            )}
        </div>
    );
}
