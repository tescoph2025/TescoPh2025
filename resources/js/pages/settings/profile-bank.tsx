import { RoleProps, type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Bank Details',
        href: '/settings/profile',
    },
];

export default function ProfileBank() {
    const { auth, bank_details } = usePage<SharedData>().props;

    console.log('bank_details', bank_details);

    const { data, setData, post, errors, reset, processing, recentlySuccessful } = useForm({
        bank_name: bank_details?.bank_name,
        bank_account_name: bank_details?.bank_account_name,
        bank_account_number: bank_details?.bank_account_number,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('postprofile.bank'), {
            // onSuccess: () => {
            //     // reset('image');
            //     // setPreviewImage(auth.user.profile_image ? `/storage/${auth.user.profile_image}` : null);
            //     router.visit(window.location.pathname, {
            //         //Reload the full page.
            //         replace: true,
            //     });
            // },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Profile image" />

            <SettingsLayout>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Bank Name</Label>

                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.bank_name}
                            onChange={(e) => setData('bank_name', e.target.value)}
                            required
                            placeholder="Bank name"
                        />

                        <InputError className="mt-2" message={errors.bank_name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Bank Account Name</Label>

                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.bank_account_name}
                            onChange={(e) => setData('bank_account_name', e.target.value)}
                            required
                            placeholder="Bank account name"
                        />

                        <InputError className="mt-2" message={errors.bank_account_name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Bank Account Number</Label>

                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.bank_account_number}
                            onChange={(e) => setData('bank_account_number', e.target.value)}
                            required
                            placeholder="Bank account number"
                        />

                        <InputError className="mt-2" message={errors.bank_account_number} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>{bank_details ? 'Update' : 'Save'}</Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Saved</p>
                        </Transition>
                    </div>
                </form>
            </SettingsLayout>
        </AppLayout>
    );
}
