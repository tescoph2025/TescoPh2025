import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { formatDate, formattedNumber } from '@/utils/utils';
import { Head, usePage } from '@inertiajs/react';
import { CircleCheck, CircleSlash, Timer } from 'lucide-react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Withdraw Records',
        href: '/withdraw-history',
    },
];

export type WITHDRAWTYPE = {
    updated_at: string;
    withdrawal_amount: number;
    status: string;
};

export default function WithdrawtHistory() {
    const { auth, history, total_withdraw } = usePage<{
        history: WITHDRAWTYPE[];
        total_withdraw: number;
        auth: Auth;
    }>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col items-center gap-y-4 p-4">
                <div className="w-full max-w-[1200px]">
                    <div>
                        <Card className="mt-6 px-4">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold">Withdrawals</p>
                                <Badge className="px-4 py-2 text-sm">
                                    Total: <b>{formattedNumber(total_withdraw)}</b>
                                </Badge>
                            </div>
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {history.map((item) => (
                                        <TableRow>
                                            <TableCell className="font-medium">{formatDate(item.updated_at)}</TableCell>
                                            <TableCell>
                                                {item.status == 'approved' && <CircleCheck className="text-green-400" />}
                                                {item.status == 'denied' && <CircleSlash className="text-red-400" />}
                                                {item.status == 'pending' && <Timer size={27} className="text-blue-500" />}
                                            </TableCell>
                                            <TableCell className=" ">{formattedNumber(item.withdrawal_amount)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
