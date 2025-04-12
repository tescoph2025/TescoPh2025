import InterestTab, { INTERESTTYPE } from '@/components/client/income-history/interest';
import ReferralTab, { REFERRALBUNOSTYPE } from '@/components/client/income-history/referral-tab';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TabsClear, TabsContentClear, TabsListClear, TabsTriggerClear } from '@/components/ui/tabs-clear';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { formattedNumber } from '@/utils/utils';
import { Head, usePage } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Income History',
        href: '/income-historys',
    },
];

export default function AdminTransferFunds() {
    const { auth, data, referral_bonus } = usePage<{
        data: INTERESTTYPE[];
        referral_bonus: REFERRALBUNOSTYPE[];
        auth: Auth;
    }>().props;

    console.log(data, referral_bonus);
    function totalAmount(array: any[]): number {
        return array.reduce((a, b) => Number(a) + Number(b.daily_shares_value), 0);
    }
    function totalAmountReferral(array: any[]): number {
        return array.reduce((a, b) => Number(a) + Number(b.bonus_amount), 0);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Income History" />
            <div className="mx-auto">
                <TabsClear defaultValue="send" className="mt-6 px-4">
                    <TabsListClear className="grid grid-cols-2">
                        <TabsTriggerClear value="send">Interest Income</TabsTriggerClear>
                        <TabsTriggerClear value="received">Referrals Income</TabsTriggerClear>
                    </TabsListClear>
                    <TabsContentClear value="send">
                        <div className="w-screen md:w-[calc(100vw-300px)]">
                            <div className="">
                                <div className="rounded-md border">
                                    <div className="flex items-center justify-between p-4">
                                        <p className="font-semibold"></p>
                                        <Badge className="px-4 py-2 text-sm">
                                            Total: <b>{formattedNumber(Number(totalAmount(data)))}</b>
                                        </Badge>
                                    </div>
                                    <Separator orientation="horizontal" />
                                    <InterestTab data={data} />
                                </div>
                            </div>
                        </div>
                    </TabsContentClear>
                    <TabsContentClear value="received">
                        <div className="w-screen md:w-[calc(100vw-300px)]">
                            <div className="">
                                <div className="rounded-md border">
                                    <div className="flex items-center justify-between p-4">
                                        <p className="font-semibold"></p>
                                        <Badge className="px-4 py-2 text-sm">
                                            Total: <b>{formattedNumber(Number(totalAmountReferral(referral_bonus)))}</b>
                                        </Badge>
                                    </div>
                                    <Separator orientation="horizontal" />
                                    <ReferralTab data={referral_bonus} />
                                </div>
                            </div>
                        </div>
                    </TabsContentClear>
                </TabsClear>
            </div>
        </AppLayout>
    );
}
