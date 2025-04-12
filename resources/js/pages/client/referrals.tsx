import { default as ReferralActiveTab } from '@/components/client/referral/active-tab';
import ReferralPendingTab from '@/components/client/referral/inactive-tab';
import { Separator } from '@/components/ui/separator';
import { TabsClear, TabsContentClear, TabsListClear, TabsTriggerClear } from '@/components/ui/tabs-clear';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Referrals',
        href: '/referrals',
    },
];

type ACTIVEDATATYPE = {
    id: number;
    amount: number;
    days_remaining: number;
    deposit_date: string;
    package_name: string;
    status: string;
};

type PENDINGDATATYPE = {
    id: number;
    amount: number;
    days_remaining: number;
    deposit_date: string;
    package_name: string;
    status: string;
};

export default function DepositHistory() {
    const { auth, active, inactive } = usePage<{
        active: ACTIVEDATATYPE[];
        inactive: PENDINGDATATYPE[];
        auth: Auth;
    }>().props;

    function totalAmount(array: any[]): number {
        return array.reduce((a, b) => Number(a) + Number(b.amount), 0);
    }
    console.log('active', active);
    console.log('inactive', inactive);
    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Dashboard" />
            <div className="mx-auto">
                <TabsClear defaultValue="send" className="mt-6 px-4">
                    <TabsListClear className="grid grid-cols-2">
                        <TabsTriggerClear value="send">Active Referrals</TabsTriggerClear>
                        <TabsTriggerClear value="received">Inactive Referrals</TabsTriggerClear>
                    </TabsListClear>
                    <TabsContentClear value="send">
                        <div className="w-screen md:w-[calc(100vw-300px)]">
                            <div className="">
                                <div className="rounded-md border">
                                    <div className="flex items-center justify-between p-4"></div>
                                    <Separator orientation="horizontal" />
                                    <ReferralActiveTab data={active} />
                                </div>
                            </div>
                        </div>
                    </TabsContentClear>
                    <TabsContentClear value="received">
                        <div className="w-screen md:w-[calc(100vw-300px)]">
                            <div className="">
                                <div className="rounded-md border">
                                    <div className="flex items-center justify-between p-4"></div>
                                    <Separator orientation="horizontal" />
                                    <ReferralPendingTab data={inactive} />
                                </div>
                            </div>
                        </div>
                    </TabsContentClear>
                </TabsClear>
            </div>
        </AppLayout>
    );
}
