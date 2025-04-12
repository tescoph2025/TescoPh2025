import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { formattedNumber } from '@/utils/utils';
import { Head, Link as LinkURL, usePage } from '@inertiajs/react';
import { CircleDollarSign, CreditCard } from 'lucide-react';
import { useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface PageProps {
    APP_DOMAIN: string;
    auth: Auth;
    [key: string]: any; // Allow additional properties
}

export default function Dashboard() {
    const { APP_DOMAIN, auth, testpass, account_balance, active_deposit, total_interest, total_withdraw, recentHistory } = usePage<PageProps>().props;
    console.log(recentHistory);
    const refValue = useRef<HTMLInputElement>(null);

    const handleCopy = () => {
        if (refValue.current) {
            navigator.clipboard
                .writeText(refValue.current.value)
                .then(() => alert('Link copied to clipboard!'))
                .catch((err) => console.error('Failed to copy: ', err));
        }
    };

    // console.log(auth);
    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="text-muted-foreground h-4 w-4"
                            >
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formattedNumber(account_balance)}</div>
                            {/* <p className="text-xs text-muted-foreground">
                                  +20.1% from last month
                                </p> */}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Interest</CardTitle>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-piggy-bank"
                                viewBox="0 0 16 16"
                            >
                                <path d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.138-1.496A6.6 6.6 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.6 7.6 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962" />
                                <path
                                    fill-rule="evenodd"
                                    d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069q0-.218-.02-.431c.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a1 1 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.74.74 0 0 0-.375.562c-.024.243.082.48.32.654a2 2 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595M2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.6 6.6 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.65 4.65 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393m12.621-.857a.6.6 0 0 1-.098.21l-.044-.025c-.146-.09-.157-.175-.152-.223a.24.24 0 0 1 .117-.173c.049-.027.08-.021.113.012a.2.2 0 0 1 .064.199"
                                />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formattedNumber(total_interest)}</div>
                            {/* <p className="text-xs text-muted-foreground">
                                  +180.1% from last month
                                </p> */}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Deposit</CardTitle>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="text-muted-foreground h-4 w-4"
                            >
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formattedNumber(active_deposit)}</div>
                            {/* <p className="text-xs text-muted-foreground">
                                  +19% from last month
                                </p> */}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Withdrawal</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="text-muted-foreground h-4 w-4"
                            >
                                <rect width="20" height="14" x="2" y="5" rx="2" />
                                <path d="M2 10h20" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formattedNumber(total_withdraw)}</div>
                            {/* <p className="text-xs text-muted-foreground">
                                  +201 since last hour
                                </p> */}
                        </CardContent>
                    </Card>
                </div>
                {/* <div className="grid gap-y-4"> */}
                <div className="flex flex-col gap-3 lg:flex-row">
                    <Card className="w-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="flex text-sm font-bold">
                                <CircleDollarSign className="mr-2" />
                                Recent Deposit
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between">
                                <LinkURL className="hover:underline" href={route('deposit-history')}>
                                    View All
                                </LinkURL>
                                <p className="text-md font-semi">
                                    {recentHistory?.recentDeposit?.amount ? formattedNumber(recentHistory?.recentDeposit?.amount) : 0}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="flex text-sm font-bold">
                                <CreditCard className="mr-2" />
                                Recent Withdrawal
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between">
                                <LinkURL className="hover:underline" href={route('withdraw-history')}>
                                    View All
                                </LinkURL>

                                <p className="text-md font-semi">
                                    ${' '}
                                    {recentHistory?.recentWithdraw?.withdrawal_amount
                                        ? formattedNumber(recentHistory?.recentWithdraw?.withdrawal_amount)
                                        : 0}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="flex text-sm font-bold">Your Network</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex space-x-2">
                            <Input ref={refValue} value={`${APP_DOMAIN}/ref/${auth?.user?.username}`} readOnly />
                            <Button variant="secondary" className="shrink-0" onClick={handleCopy}>
                                Copy Link
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
