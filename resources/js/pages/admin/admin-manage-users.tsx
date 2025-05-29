import AdminManageUsersTable from '@/components/admin/admin-manage-users/admin-manage-users-table';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Users',
        href: '/admin-manage-users',
    },
];

interface PageProps {
    APP_DOMAIN: string;
    auth: Auth;
    data: any[];
    packages: { id: number; package_name: string }[];
}

export default function AdminManageUsers() {
    const { auth, data, packages } = usePage<PageProps>().props;

    const [packageId, setPackageId] = useState<number>(packages[0]?.id || 0);
    const [additionalSlots, setAdditionalSlots] = useState<number>(0);

    const onSubmitSlotUpdate = (e: FormEvent) => {
        e.preventDefault();
        router.post('/admin-package-update-slots', {
            package_id: packageId,
            additional_slots: additionalSlots,
        }, {
            onSuccess: () => alert('Slots updated successfully!'),
            onError: () => alert('Failed to update slots.'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col items-center gap-y-4 p-4">
                <div className="w-screen md:w-[calc(100vw-300px)]">
                    <div className="rounded-md border">
                        <div className="block items-center justify-between p-4 sm:flex">
                            <p className="font-semibold">Registered Users</p>
                        </div>
                        <Separator orientation="horizontal" />
                        <AdminManageUsersTable data={data} />
                    </div>

                    {/* ✅ Add Slot Form */}
                    <div className="mt-8 rounded-md border p-4">
                        <p className="font-semibold mb-2">Add Available Slots to Package</p>
                        <form onSubmit={onSubmitSlotUpdate} className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="flex flex-col">
                                <Label htmlFor="package">Select Package</Label>
                                <select
                                    id="package"
                                    value={packageId}
                                    onChange={(e) => setPackageId(Number(e.target.value))}
                                    className="rounded border p-2"
                                >
                                    {packages.map((pkg) => (
                                        <option key={pkg.id} value={pkg.id}>
                                            {pkg.package_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="slots">Slots to Add</Label>
                                <Input
                                    type="number"
                                    id="slots"
                                    value={additionalSlots}
                                    onChange={(e) => setAdditionalSlots(Number(e.target.value))}
                                    className="w-32"
                                    placeholder="e.g. 10"
                                    min={1}
                                />
                            </div>
                            <Button type="submit">Update Slots</Button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
