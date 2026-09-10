import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Plus, Pencil, Trash2, Star, Loader2 } from 'lucide-react';
import { router } from '@inertiajs/react';

interface Address {
    id: number;
    first_name: string;
    last_name: string;
    company?: string;
    phone?: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state?: string;
    postal_code: string;
    country: string;
    is_default: boolean;
}

interface AddressesIndexProps {
    addresses: Address[];
}

export default function AccountAddressesIndexPage({ addresses }: AddressesIndexProps) {
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState<Record<number, boolean>>({});
    const [isSettingDefault, setIsSettingDefault] = useState<Record<number, boolean>>({});

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        company: '',
        phone: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        is_default: false,
    });

    const handleAddNew = () => {
        setEditingAddress(null);
        setFormData({
            first_name: '',
            last_name: '',
            company: '',
            phone: '',
            address_line_1: '',
            address_line_2: '',
            city: '',
            state: '',
            postal_code: '',
            country: '',
            is_default: false,
        });
        setShowForm(true);
    };

    const handleEdit = (address: Address) => {
        setEditingAddress(address);
        setFormData({
            first_name: address.first_name,
            last_name: address.last_name,
            company: address.company || '',
            phone: address.phone || '',
            address_line_1: address.address_line_1,
            address_line_2: address.address_line_2 || '',
            city: address.city,
            state: address.state || '',
            postal_code: address.postal_code,
            country: address.country,
            is_default: address.is_default,
        });
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editingAddress) {
                await router.put(`/account/addresses/${editingAddress.id}`, formData);
            } else {
                await router.post('/account/addresses', formData);
            }
            setShowForm(false);
            setEditingAddress(null);
        } catch (error) {
            console.error('Address save error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (addressId: number) => {
        if (!confirm('Are you sure you want to delete this address?')) return;

        setIsDeleting(prev => ({ ...prev, [addressId]: true }));

        try {
            await router.delete(`/account/addresses/${addressId}`);
        } catch (error) {
            console.error('Address delete error:', error);
            setIsDeleting(prev => ({ ...prev, [addressId]: false }));
        }
    };

    const handleSetDefault = async (addressId: number) => {
        setIsSettingDefault(prev => ({ ...prev, [addressId]: true }));

        try {
            await router.put(`/account/addresses/${addressId}`, { is_default: true });
        } catch (error) {
            console.error('Set default address error:', error);
            setIsSettingDefault(prev => ({ ...prev, [addressId]: false }));
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingAddress(null);
        setFormData({
            first_name: '',
            last_name: '',
            company: '',
            phone: '',
            address_line_1: '',
            address_line_2: '',
            city: '',
            state: '',
            postal_code: '',
            country: '',
            is_default: false,
        });
    };

    const formatAddress = (address: Address) => {
        const parts = [
            `${address.first_name} ${address.last_name}`,
            address.company,
            address.address_line_1,
            address.address_line_2,
            `${address.city}, ${address.state} ${address.postal_code}`,
            address.country,
        ].filter(Boolean);

        return parts.join(', ');
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">My Addresses</h1>
                    <p className="text-muted-foreground">
                        {addresses.length} {addresses.length === 1 ? 'address' : 'addresses'}
                    </p>
                </div>
                <Button onClick={handleAddNew} className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Address
                </Button>
            </div>

            {/* Address Form */}
            {showForm && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>
                            {editingAddress ? 'Edit Address' : 'Add New Address'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first_name">First Name *</Label>
                                    <Input
                                        id="first_name"
                                        value={formData.first_name}
                                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last_name">Last Name *</Label>
                                    <Input
                                        id="last_name"
                                        value={formData.last_name}
                                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company">Company</Label>
                                <Input
                                    id="company"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address_line_1">Address Line 1 *</Label>
                                <Input
                                    id="address_line_1"
                                    value={formData.address_line_1}
                                    onChange={(e) => setFormData({ ...formData, address_line_1: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address_line_2">Address Line 2</Label>
                                <Input
                                    id="address_line_2"
                                    value={formData.address_line_2}
                                    onChange={(e) => setFormData({ ...formData, address_line_2: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City *</Label>
                                    <Input
                                        id="city"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">State</Label>
                                    <Input
                                        id="state"
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="postal_code">Postal Code *</Label>
                                    <Input
                                        id="postal_code"
                                        value={formData.postal_code}
                                        onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country">Country *</Label>
                                <Input
                                    id="country"
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="is_default"
                                    checked={formData.is_default}
                                    onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                                    className="rounded border-gray-300"
                                />
                                <Label htmlFor="is_default" className="cursor-pointer">
                                    Set as default address
                                </Label>
                            </div>

                            <div className="flex gap-2 justify-end">
                                <Button type="button" variant="outline" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        editingAddress ? 'Update Address' : 'Add Address'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Address List */}
            {addresses.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No addresses yet</h3>
                        <p className="text-muted-foreground mb-4">
                            Add your first address to make checkout faster.
                        </p>
                        <Button onClick={handleAddNew}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Address
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {addresses.map((address) => (
                        <Card key={address.id} className="relative">
                            {address.is_default && (
                                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                                    <Star className="h-3 w-3 mr-1 fill-current" />
                                    Default
                                </Badge>
                            )}
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    {address.first_name} {address.last_name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-sm text-muted-foreground">
                                    {formatAddress(address)}
                                </p>
                                <Separator />
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(address)}
                                        className="flex-1"
                                    >
                                        <Pencil className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                    {!address.is_default && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleSetDefault(address.id)}
                                            disabled={isSettingDefault[address.id]}
                                            className="flex-1"
                                        >
                                            {isSettingDefault[address.id] ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Star className="h-4 w-4 mr-2" />
                                            )}
                                            Set Default
                                        </Button>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDelete(address.id)}
                                        disabled={isDeleting[address.id]}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        {isDeleting[address.id] ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
