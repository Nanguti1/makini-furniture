import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function StoreFooter() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Makini Queens</h3>
                        <p className="text-sm text-muted-foreground">
                            Premium furniture for modern living. Quality craftsmanship meets timeless design.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-muted-foreground hover:text-foreground">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Shop</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/catalog" className="text-muted-foreground hover:text-foreground">
                                    All Products
                                </a>
                            </li>
                            <li>
                                <a href="/catalog?category=sofas" className="text-muted-foreground hover:text-foreground">
                                    Sofas
                                </a>
                            </li>
                            <li>
                                <a href="/catalog?category=tables" className="text-muted-foreground hover:text-foreground">
                                    Tables
                                </a>
                            </li>
                            <li>
                                <a href="/catalog?category=chairs" className="text-muted-foreground hover:text-foreground">
                                    Chairs
                                </a>
                            </li>
                            <li>
                                <a href="/catalog?category=bedroom" className="text-muted-foreground hover:text-foreground">
                                    Bedroom
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/pages/about" className="text-muted-foreground hover:text-foreground">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/pages/contact" className="text-muted-foreground hover:text-foreground">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="/faqs" className="text-muted-foreground hover:text-foreground">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="/pages/shipping" className="text-muted-foreground hover:text-foreground">
                                    Shipping
                                </a>
                            </li>
                            <li>
                                <a href="/pages/returns" className="text-muted-foreground hover:text-foreground">
                                    Returns
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Contact</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>123 Furniture Street, Design City</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>hello@makiniqueens.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Makini Queens Furniture. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
