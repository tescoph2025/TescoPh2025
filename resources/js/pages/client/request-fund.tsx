import { RequestFundPayment } from '@/components/client/request-fund/RequestFundPayment';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { formattedNumber } from '@/utils/utils';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Income History',
        href: '/income-historys',
    },
];

export interface ReceivingBank {
    id: number;
    bank_name: string;
    payment_channel: string;
    account_name: string;
    account_number: string;
    receiving_bank: string;
}

export default function AdminTransferFunds() {
    const { receiving_bank, auth } = usePage<{
        receiving_bank: ReceivingBank[];
        auth: Auth;
    }>().props;

    function totalAmount(array: any[]): number {
        return array.reduce((a, b) => Number(a) + Number(b.daily_shares_value), 0);
    }
    function totalAmountReferral(array: any[]): number {
        return array.reduce((a, b) => Number(a) + Number(b.bonus_amount), 0);
    }

    const [isrequest, setrequest] = useState(false);

    function onRequest() {
        setrequest((prev) => !prev);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth?.user.role as RoleProps}>
            <Head title="Income History" />
            <div className="mx-auto">
                <div className="mt-6 w-screen px-4 md:w-[calc(100vw-300px)]">
                    <div>
                        <Button className="mb-3 cursor-pointer" onClick={onRequest}>
                            Request Fund
                        </Button>
                        <RequestFundPayment open={isrequest} onOpen={onRequest} receiving_bank={receiving_bank} />
                        <div className="rounded-md border">
                            <div className="flex items-center justify-between p-4">
                                <p className="font-semibold"></p>
                                <Badge className="px-4 py-2 text-sm">
                                    Total: <b>{formattedNumber(Number(100))}</b>
                                </Badge>
                            </div>
                            <Separator orientation="horizontal" />
                            {/* <InterestTab data={data} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
