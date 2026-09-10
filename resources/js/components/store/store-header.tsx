import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function StoreHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-8">
                        <a href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold tracking-tight">
                                Makini Queens
                            </span>
                        </a>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6">
                            <a
                                href="/catalog"
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                Shop
                            </a>
                            <a
                                href="/lookbooks"
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                Lookbooks
                            </a>
                            <a
                                href="/pages/about"
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                About
                            </a>
                            <a
                                href="/faqs"
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                FAQ
                            </a>
                        </nav>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="hidden lg:flex items-center">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-48 md:w-64 pl-9"
                                />
                            </div>
                        </div>

                        {/* Account */}
                        <Button variant="ghost" size="icon" asChild>
                            <a href="/account">
                                <User className="h-5 w-5" />
                                <span className="sr-only">Account</span>
                            </a>
                        </Button>

                        {/* Cart */}
                        <Button variant="ghost" size="icon" asChild>
                            <a href="/cart">
                                <ShoppingBag className="h-5 w-5" />
                                <span className="sr-only">Cart</span>
                            </a>
                        </Button>

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t py-4">
                        <nav className="flex flex-col gap-4">
                            <a
                                href="/catalog"
                                className="text-sm font-medium transition-colors hover:text-primary"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Shop
                            </a>
                            <a
                                href="/lookbooks"
                                className="text-sm font-medium transition-colors hover:text-primary"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Lookbooks
                            </a>
                            <a
                                href="/pages/about"
                                className="text-sm font-medium transition-colors hover:text-primary"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </a>
                            <a
                                href="/faqs"
                                className="text-sm font-medium transition-colors hover:text-primary"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                FAQ
                            </a>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-full pl-9"
                                />
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
