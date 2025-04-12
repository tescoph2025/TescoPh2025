import AdminTranferFundsTab, { TRANSFERFUNDSTYPES } from '@/components/admin/admin-transfer-funds/admin-transfer-funds-tab';
import { REFERRALBUNOSTYPE } from '@/components/client/income-history/referral-tab';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { formattedNumber } from '@/utils/utils';
import { Head, usePage } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transfer History',
        href: '/admin-transfer-funds',
    },
];

export default function IncomeHistory() {
    const { auth, accountbalance, referral_bonus } = usePage<{
        accountbalance: TRANSFERFUNDSTYPES[];
        referral_bonus: REFERRALBUNOSTYPE[];
        auth: Auth;
    }>().props;

    console.log(accountbalance, referral_bonus);
    function totalAmount(array: any[]) {
        const accountbalance = array.reduce((a, b) => Number(a) + Number(b.amount), 0);
        return {
            accountbalance,
        };
    }
    function totalAmountReferral(array: any[]): number {
        return array.reduce((a, b) => Number(a) + Number(b.bonus_amount), 0);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Income History" />
            <div className="mx-auto">
                <div className="w-screen md:w-[calc(100vw-300px)]">
                    <div className="">
                        <div className="rounded-md border">
                            <div className="flex items-center justify-between p-4">
                                <p className="font-semibold">Transfer History</p>
                                <Badge className="px-4 py-2 text-sm">
                                    Total: <b>{formattedNumber(Number(totalAmount(accountbalance).accountbalance))}</b>
                                </Badge>
                            </div>
                            <Separator orientation="horizontal" />
                            <AdminTranferFundsTab data={accountbalance} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
