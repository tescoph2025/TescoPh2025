import ActiveTab, { ACTIVEDATATYPE } from '@/components/client/deposit-history/active-tab';
import PendingTab, { PENDINGDATATYPE } from '@/components/client/deposit-history/pending-tab';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TabsClear, TabsContentClear, TabsListClear, TabsTriggerClear } from '@/components/ui/tabs-clear';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { formattedNumber } from '@/utils/utils';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Deposit History',
        href: '/deposit-history',
    },
];

export default function DepositHistory() {
    const { auth, active, pending, receiving_banks } = usePage<{
        active: ACTIVEDATATYPE[];
        pending: PENDINGDATATYPE[];
        auth: Auth;
    }>().props;
    console.log(receiving_banks);

    function totalAmount(array: any[]): number {
        return array.reduce((a, b) => Number(a) + Number(b.amount), 0);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Dashboard" />
            <div className="mx-auto">
                <TabsClear defaultValue="send" className="mt-6 px-4">
                    <TabsListClear className="grid grid-cols-2">
                        <TabsTriggerClear value="send">Active Deposits</TabsTriggerClear>
                        <TabsTriggerClear value="received">Pending Deposits</TabsTriggerClear>
                    </TabsListClear>
                    <TabsContentClear value="send">
                        <div className="w-screen md:w-[calc(100vw-300px)]">
                            <div className="">
                                <div className="rounded-md border">
                                    <div className="flex items-center justify-between p-4">
                                        <p className="font-semibold"></p>
                                        <Badge className="px-4 py-2 text-sm">
                                            Total: <b>{formattedNumber(totalAmount(active))}</b>
                                        </Badge>
                                    </div>
                                    <Separator orientation="horizontal" />
                                    <ActiveTab data={active} />
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
                                            Total: <b>{formattedNumber(totalAmount(pending))}</b>
                                        </Badge>
                                    </div>
                                    <Separator orientation="horizontal" />
                                    <PendingTab data={pending} receiving_banks={receiving_banks} />
                                </div>
                            </div>
                        </div>
                    </TabsContentClear>
                </TabsClear>
            </div>
        </AppLayout>
    );
}
