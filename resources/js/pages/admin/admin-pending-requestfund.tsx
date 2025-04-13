import { PENDINGDATATYPE } from '@/components/admin/admin-pending-deposits/admin-pending-table';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Approved Transfer Fund',
        href: '/admin-approved-requestfund',
    },
];

interface PageProps {
    APP_DOMAIN: string;
    auth: Auth;
    [key: string]: any; // Allow additional properties
    deposits: PENDINGDATATYPE[];
}

function totalAmount(array: any[]): number {
    return array.reduce((a, b) => Number(a) + Number(b.amount), 0);
}

export default function AdminPendingRequestFund() {
    const { auth, data } = usePage<PageProps>().props;
    console.log(data);
    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col items-center gap-y-4 p-4">
                <div className="w-screen md:w-[calc(100vw-300px)]">
                    <div className="">
                        <div className="rounded-md border">
                            {/* <div className="flex items-center justify-between p-4">
                                <p className="font-semibold">Approved Deposits</p>
                                <Badge className="px-4 py-2 text-sm">
                                    Total: <b>{formattedNumber(Number(totalAmount(deposits)))}</b>
                                </Badge>
                            </div>
                            <Separator orientation="horizontal" />
                            <ApprovedTable data={deposits} /> */}
                            Pendingggg
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
