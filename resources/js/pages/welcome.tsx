// import tescoLogo from '@/images/Tesco_logo.png';
import { type SharedData } from '@/types';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import bgImage from '../images/1.jpg';
import video1 from '../images/welcome_video.mp4';
import Tescologo from './tescologo';

const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'About', href: '#' },
];

export default function Welcome() {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    const { auth, ref } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [storedRef, setStoredRef] = useState<string | null>(null);

    useEffect(() => {
        if (ref) {
            console.log(ref);
            setStoredRef(ref);
        }
    }, [ref]);
    //yawa
    return (
        <div style={{ backgroundImage: `url(${bgImage})` }} className="h-screen overflow-hidden bg-cover bg-center bg-no-repeat">
            {/* <header className="sticky inset-x-0 top-0 z-50 bg-gradient-to-b from-white from-10% via-white via-80% to-transparent to-100% pb-4"> */}
            <header className="sticky inset-x-0 top-0 z-50 bg-white">
                <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            {/* <img alt="" src={tescoLogo} className="h-auto w-32" /> */}
                            <Tescologo />
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {/* {navigation.map((item) => (
                            <button
                                onClick={() => scrollToSection(item.name)}
                                key={item.name}
                                className="cursor-pointer text-sm/6 font-semibold text-gray-900 transition-colors duration-300 hover:text-blue-700"
                            >
                                {item.name}
                            </button>
                        ))} */}
                    </div>
                    <div className="hidden gap-2 lg:flex lg:flex-1 lg:justify-end">
                        {/* <a href="#" className="text-sm/6 font-semibold text-gray-900">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </a> */}
                        {/* <CustomDialog /> */}
                        {auth.user ? (
                            <Link
                                href={auth.user.role === 'admin' ? route('admin-pending-deposits') : route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent bg-[#00539f] px-5 py-1.5 text-sm leading-normal font-bold text-[white] hover:border-[#19140035]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#00539f] px-5 py-1.5 text-sm leading-normal font-bold text-[#00539f] hover:border-[#00539f]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-1/2 overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                {/* <img alt="" src={tescoLogo} className="h-auto w-32" /> */}
                                <Tescologo />
                            </a>
                            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {/* {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            onClick={() => scrollToSection(item.name)}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </a>
                                    ))} */}
                                </div>
                                <div className="py-1">
                                    {auth.user ? (
                                        <Link
                                            href={auth.user.role === 'admin' ? route('admin-dashboard') : route('dashboard')}
                                            // href={route('admin-dashboard')}
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>

            <div className="relative isolate h-[100vh] overflow-auto px-6 pb-52 lg:px-8">
                <div className="mx-auto my-5 flex max-w-5xl flex-col gap-15 rounded-lg bg-white/90 p-8 py-7 shadow-lg backdrop-blur-md lg:flex-row">
                    <video autoPlay loop muted controls className="collapse h-0 w-2xl overflow-hidden rounded-xl md:visible md:h-auto lg:mt-2">
                        <source src={video1} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="lg:pt-10">
                        <p className="text-center text-6xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl md:text-left">
                            We invest in <span className="text-red-500">unlocking</span> the world's possibilities.
                        </p>
                        <p className="text-md mt-8 text-center font-medium text-pretty text-gray-500 sm:text-xl/8 lg:text-left">
                            At Tesco Ph, we concentrate on markets where technology, innovation, and capital have the potential to unlock long-term
                            value and stimulate economic growth.
                        </p>
                        <div className="mt-4 mt-5 flex items-center justify-center gap-2 md:justify-start">
                            {auth.user ? (
                                <Link
                                    href={auth.user.role === 'admin' ? route('admin-dashboard') : route('dashboard')}
                                    className="inline-block rounded-sm border border-transparent bg-[#00539f] px-5 py-1.5 text-lg leading-normal font-bold text-[white] hover:border-[#19140035]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border border-transparent bg-[#00539f] px-5 py-1.5 text-lg leading-normal font-bold text-[white] hover:border-[#19140035]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-sm border border-[#00539f] px-5 py-1.5 text-lg leading-normal font-bold text-[#00539f] hover:border-[#00539f]"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="mt-10 flex justify-center gap-10 md:justify-start">
                            <div>
                                <p className="text-md font-black text-pretty text-red-500 sm:text-xl/8">10,000 +</p>
                                <p className="text-md sm:text-md/8 font-medium text-pretty text-gray-500">Satisfied Investors</p>
                            </div>
                            <div>
                                <p className="text-md font-black text-pretty text-blue-500 sm:text-xl/8">100,000 +</p>
                                <p className="text-md sm:text-md/8 font-medium text-pretty text-gray-500">Successful Transactions</p>
                            </div>
                        </div>
                    </div>
                    <video autoPlay loop muted controls className="visible flex h-auto w-sm overflow-hidden rounded-xl md:hidden md:h-0 lg:mt-2">
                        <source src={video1} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
}
