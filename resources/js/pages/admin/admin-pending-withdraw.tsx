import PendingTable, { PENDINGDATATYPE } from '@/components/admin/admin-pending-withdraw/admin-pending-table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { formattedNumber } from '@/utils/utils';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pending Withdrawals',
        href: '/admin-pending-withdraw',
    },
];

interface PageProps {
    APP_DOMAIN: string;
    auth: Auth;
    [key: string]: any; // Allow additional properties
    withdraw: PENDINGDATATYPE[];
}

function totalAmount(array: any[]): number {
    return array.reduce((a, b) => Number(a) + Number(b.amount), 0);
}

export default function AdminPendingWithdraw() {
    const { auth, data, success, error } = usePage<PageProps>().props;
    console.log({ data });

    function successToast() {
        return toast.success(success.message);
    }
    function errorToast() {
        return toast.error(error.message);
    }

    useEffect(() => {
        success?.message && successToast(); //reset input values only if success
        error?.message && errorToast();
    }, [success, error]);

    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col items-center gap-y-4 p-4">
                <div className="w-screen md:w-[calc(100vw-300px)]">
                    <div className="">
                        <div className="rounded-md border">
                            <div className="flex items-center justify-between p-4">
                                <p className="font-semibold">Pending Withdrawals</p>
                                <Badge className="px-4 py-2 text-sm">
                                    Total: <b>{formattedNumber(Number(totalAmount(data)))}</b>
                                </Badge>
                            </div>
                            <Separator orientation="horizontal" />
                            <PendingTable data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
