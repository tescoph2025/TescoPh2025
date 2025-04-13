import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    AlignLeft,
    ArrowBigDown,
    BookUser,
    CircleCheck,
    Clock4,
    ClockAlert,
    CreditCard,
    FileClock,
    FileInput,
    IdCard,
    LayoutGrid,
    LucideCircleCheckBig,
    MailCheck,
    Package,
    Plus,
    Store,
    TypeOutline,
    Users,
    WalletCards,
} from 'lucide-react';
import AppLogo from './app-logo';

const AdminmainNavItems: NavItem[] = [
    // {
    //     title: 'Dashboard',
    //     url: '/admin-dashboard',
    //     icon: LayoutGrid,
    // },
    {
        title: 'Pending Deposits',
        url: '/admin-pending-deposits',
        icon: Clock4,
    },
    {
        title: 'Approved Deposits',
        url: '/admin-approved-deposits',
        icon: CircleCheck,
    },
    {
        title: 'Pending Withdrawals',
        url: '/admin-pending-withdraw',
        icon: ClockAlert,
    },
    {
        title: 'Approved Withdrawals',
        url: '/admin-approved-withdraw',
        icon: LucideCircleCheckBig,
    },
    {
        title: 'Pending Request-Fund',
        url: '/admin-pending-requestfund',
        icon: ClockAlert,
    },
    {
        title: 'Approved Request-Fund',
        url: '/admin-approved-requestfund',
        icon: LucideCircleCheckBig,
    },
    {
        title: 'Manage Users',
        url: '/admin-manage-users',
        icon: BookUser,
    },
    {
        title: 'Transfer History',
        url: '/admin-transfer-funds',
        icon: FileClock,
    },
    {
        title: 'Activation Funds',
        url: '/admin-activation-fund',
        icon: MailCheck,
    },
];

const ClientmainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Deposit',
        url: '/deposit',
        icon: Package,
    },
    {
        title: 'Withdraw',
        url: '/withdraw',
        icon: CreditCard,
    },
    {
        title: 'Transfer Fund',
        url: '/transfer-fund',
        icon: WalletCards,
    },
    {
        title: 'Request Fund',
        url: '/request-fund',
        icon: FileInput,
    },
    {
        title: 'Income History',
        url: '/income-history',
        icon: Plus,
    },
    {
        title: 'Deposit History',
        url: '/deposit-history',
        icon: ArrowBigDown,
    },
    {
        title: 'Withdraw Records',
        url: '/withdraw-history',
        icon: AlignLeft,
    },
    {
        title: 'Referrals',
        url: '/referrals',
        icon: Users,
    },
    {
        title: 'Franchise Application',
        url: '/franchise-application',
        icon: Store,
    },
    {
        title: 'Tesco Credit Application',
        url: '/credit-application',
        icon: IdCard,
    },
    {
        title: 'Tesco Profile',
        url: 'https://www.tescoplc.com/about',
        icon: TypeOutline,
    },
];
const EmptymainNavItems: NavItem[] = [
    {
        title: 'Dont',
        url: '/dont',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     url: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     url: 'https://laravel.com/docs/starter-kits',
    //     icon: BookOpen,
    // },
];

export function AppSidebar({ role }: any) {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                                {/* <img src={Tesco_logo} alt="" className="h-11" /> */}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* <NavMain items={ClientmainNavItems} /> */}
                <NavMain items={role == 'client' ? ClientmainNavItems : role == 'admin' ? AdminmainNavItems : EmptymainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
