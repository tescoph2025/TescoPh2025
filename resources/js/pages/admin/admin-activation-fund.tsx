import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TabsClear, TabsContentClear, TabsListClear, TabsTriggerClear } from '@/components/ui/tabs-clear';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { formatDate, formattedNumber } from '@/utils/utils';
import { Head, router, usePage } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transfer Fund',
        href: '/transfer-fund',
    },
];

type PageProps = {
    success: {
        message: string;
    };
    error: {
        message: string;
    };
    auth: Auth;
    account_balance: number;
    received_transactions: {
        name: string;
        transfer_amount: number;
        updated_at: string;
    }[];
    sent_transactions: {
        name: string;
        transfer_amount: number;
        updated_at: string;
    }[];
};

function totalAmount(array: any[]): number {
    return array.reduce((a, b) => Number(a) + Number(b.transfer_amount), 0);
}

export default function AdminActivationFund() {
    const { auth, account_balance, sent_transactions, received_transactions, success, error } = usePage<PageProps>().props;
    const [receiver, setReceiver] = useState('');
    const [amount, setAmount] = useState<number | string>('');

    console.log('sent_transactions', sent_transactions);
    // console.log('success', success);
    // console.log('error', error);

    function successToast() {
        return toast.success(success.message);
    }
    function errorToast() {
        return toast.error(error.message);
    }

    useEffect(() => {
        success?.message && (successToast(), setReceiver(''), setAmount(null)); //reset input values only if success
        error?.message && errorToast();
    }, [success, error]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const res = router.post('/posttransfer-fund', {
            name: receiver,
            transfer_amount: amount,
        });
    }

    function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        if (value === '') {
            setAmount(''); // Set to empty string for empty input
        } else {
            setAmount(value); // Keep as string to avoid leading zero issue.
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col items-center gap-y-4 p-4">
                <div className="w-full max-w-[900px]">
                    <Card className="p-4">
                        <Label>Receiver</Label>
                        <Input placeholder="Receiver" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
                        <Label>Amount</Label>
                        <Input placeholder="Amount" type="number" value={amount ?? ''} onChange={handleAmountChange} />
                        {/* <p className="text-accent-foreground text-sm">
                            Available: <span className="font-semibold">${account_balance}</span>
                        </p> */}
                        <Button onClick={handleSubmit}>Send</Button>
                    </Card>
                    <div className="mt-10">
                        <p className="mb-4 text-lg font-bold">TRANSACTIONS</p>
                        <TabsClear defaultValue="send" className="mt-6 w-full">
                            <TabsListClear className="grid w-full grid-cols-2 md:w-1/2">
                                <TabsTriggerClear value="send">Send</TabsTriggerClear>
                                <TabsTriggerClear value="received">Received</TabsTriggerClear>
                            </TabsListClear>
                            <TabsContentClear value="send">
                                <Card className="mt-6">
                                    <div className="flex items-center justify-between px-4">
                                        <p className="font-semibold">Send Funds</p>
                                        <Badge className="px-4 py-2 text-sm">
                                            Total: <b>{formattedNumber(totalAmount(sent_transactions))}</b>
                                        </Badge>
                                    </div>
                                    <Separator orientation="horizontal" />
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Recipient</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead className="text-right text-green-500">Amount</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {sent_transactions.map((item) => (
                                                <TableRow key={item.name}>
                                                    <TableCell className="font-medium">{item.name}</TableCell>
                                                    <TableCell>{formatDate(item.updated_at)}</TableCell>
                                                    <TableCell className="text-right text-green-500">
                                                        {formattedNumber(Number(item.transfer_amount))}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                        {/* <TableFooter>
                                            <TableRow>
                                                <TableCell colSpan={2}>Total</TableCell>
                                                <TableCell className="text-right text-green-500">$2,500.00</TableCell>
                                            </TableRow>
                                        </TableFooter> */}
                                    </Table>
                                </Card>
                            </TabsContentClear>
                            <TabsContentClear value="received">
                                <Card className="mt-6">
                                    <div className="flex items-center justify-between px-4">
                                        <p className="font-semibold">Received Funds</p>
                                        <Badge className="px-4 py-2 text-sm">
                                            Total: <b>{formattedNumber(totalAmount(received_transactions))}</b>
                                        </Badge>
                                    </div>
                                    <Separator orientation="horizontal" />
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Recipient</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead className="text-right text-green-500">Amount</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {received_transactions.map((item) => (
                                                <TableRow key={item.name}>
                                                    <TableCell className="font-medium">{item.name}</TableCell>
                                                    <TableCell>{formatDate(item.updated_at)}</TableCell>
                                                    <TableCell className="text-right text-green-500">
                                                        {formattedNumber(Number(item.transfer_amount))}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Card>
                            </TabsContentClear>
                        </TabsClear>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
