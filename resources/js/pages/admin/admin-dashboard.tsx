import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface PageProps {
    APP_DOMAIN: string;
    auth: Auth;
    [key: string]: any;
    data: any[]; // Allow additional properties
}

export default function AdminDashboard() {
    const { auth } = usePage<PageProps>().props;
    // console.log('users', data);
    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Admin Dashboard" />
            Updated
        </AppLayout>
    );
}
