import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function StoreFooter() {
    return (
        <footer className="border-t border-primary/20 bg-navy">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gold-metallic">Makini Queens Furnitures</h3>
                        <p className="text-sm text-secondary">
                            Premium furniture for modern living. Quality craftsmanship meets timeless design.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-secondary hover:text-primary">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-secondary hover:text-primary">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-secondary hover:text-primary">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-primary">Shop</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/catalog" className="text-secondary hover:text-primary">
                                    All Products
                                </a>
                            </li>
                            <li>
                                <a href="/catalog?category=sofas" className="text-secondary hover:text-primary">
                                    Sofas
                                </a>
                            </li>
                            <li>
                                <a href="/catalog?category=tables" className="text-secondary hover:text-primary">
                                    Tables
                                </a>
                            </li>
                            <li>
                                <a href="/catalog?category=chairs" className="text-secondary hover:text-primary">
                                    Chairs
                                </a>
                            </li>
                            <li>
                                <a href="/catalog?category=bedroom" className="text-secondary hover:text-primary">
                                    Bedroom
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-primary">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/pages/about" className="text-secondary hover:text-primary">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/pages/contact" className="text-secondary hover:text-primary">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="/faqs" className="text-secondary hover:text-primary">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="/pages/shipping" className="text-secondary hover:text-primary">
                                    Shipping
                                </a>
                            </li>
                            <li>
                                <a href="/pages/returns" className="text-secondary hover:text-primary">
                                    Returns
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-primary">Contact</h3>
                        <ul className="space-y-2 text-sm text-secondary">
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>123 Furniture Street, Design City</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>hello@makiniqueens.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-primary/20 text-center text-sm text-secondary">
                    <p>&copy; {new Date().getFullYear()} Makini Queens Furnitures. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
