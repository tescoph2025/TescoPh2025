import AdminManageUsersTable from '@/components/admin/admin-manage-users/admin-manage-users-table';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Users',
        href: '/admin-manage-users',
    },
];

interface PageProps {
    APP_DOMAIN: string;
    auth: Auth;
    [key: string]: any; // Allow additional properties
    // deposits: PENDINGDATATYPE[];
}

// function totalAmount(array: any[]) {
//     const balance: number = array.reduce((a, b) => Number(a) + Number(b.balance), 0);
//     const deposit: number = array.reduce((a, b) => Number(a) + Number(b.total_deposit), 0);
//     return {
//         balance,
//         deposit,
//     };
// }

export default function AdminManageUsers() {
    const { auth, data } = usePage<PageProps>().props;
    // console.log({ data });

    const onClickBtn = (e: FormEvent) => {
        e.preventDefault();

        router.get('/getmanageusers', {});
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col items-center gap-y-4 p-4">
                <div className="w-screen md:w-[calc(100vw-300px)]">
                    <div className="">
                        <div className="rounded-md border">
                            <div className="block items-center justify-between p-4 sm:flex">
                                <p className="font-semibold">Registered Users</p>
                                {/* <div className="block gap-x-2 sm:flex">
                                    <Badge className="my-2 w-full px-4 py-2 text-sm sm:my-0 sm:w-auto">
                                        Total Balance: <b>{formattedNumber(Number(totalAmount(data).balance))}</b>
                                    </Badge>
                                    <Badge className="w-full px-4 py-2 text-sm sm:w-auto">
                                        Total Deposit: <b>{formattedNumber(Number(totalAmount(data).deposit))}</b>
                                    </Badge>
                                </div> */}
                            </div>
                            <Separator orientation="horizontal" />
                            <AdminManageUsersTable data={data} />
                            {/* <Button onClick={onClickBtn}>Check</Button> */}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
