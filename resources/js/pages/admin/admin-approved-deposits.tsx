import ApprovedTable, { APPROVEDDATATYPE } from '@/components/admin/admin-approved-deposits/admin-approved-table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { formattedNumber } from '@/utils/utils';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Approved Deposits',
        href: '/admin-pending-deposits',
    },
];

interface PageProps {
    APP_DOMAIN: string;
    auth: Auth;
    [key: string]: any; // Allow additional properties
    deposits: APPROVEDDATATYPE[];
}

function totalAmount(array: any[]): number {
    return array.reduce((a, b) => Number(a) + Number(b.amount), 0);
}

export default function AdminPendingDeposits() {
    const { auth, deposits } = usePage<PageProps>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col items-center gap-y-4 p-4">
                <div className="w-screen md:w-[calc(100vw-300px)]">
                    <Alert className="mb-4">
                        <AlertTitle>Notice</AlertTitle>
                        <AlertDescription>Only online deposits can be deleted.</AlertDescription>
                    </Alert>

                    <div className="">
                        <div className="rounded-md border">
                            <div className="flex items-center justify-between p-4">
                                <p className="font-semibold">Approved Deposits</p>
                                <Badge className="px-4 py-2 text-sm">
                                    Total: <b>{formattedNumber(Number(totalAmount(deposits)))}</b>
                                </Badge>
                            </div>
                            <Separator orientation="horizontal" />
                            <ApprovedTable data={deposits} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
