import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formattedNumber } from '@/utils/utils';
import { router } from '@inertiajs/react';
import { format } from 'date-fns';
import { FormEvent } from 'react';
import { Separator } from '../../ui/separator';
import { FINALVALUES } from './PackageModal';

interface PackageModalProps {
    open: boolean;
    onOpen: () => void;
    finalValues: FINALVALUES | undefined;
}

export function PaymentSuccessfulModal({ open, finalValues, onOpen }: PackageModalProps) {
    console.log('accbal', finalValues);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        router.post('/postpackage', {
            package_id: finalValues?.pck.id, // Passed as a prop
            bank_id: null, // From useState
            payment_method: finalValues?.paymentMode, // From useState
            amount: finalValues?.amount, // From useState
        });
        onOpen();
    };

    const today = new Date();
    const formattedDate = format(today, 'MMM dd, yyyy');

    return (
        <Dialog open={open} onOpenChange={onOpen}>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Payment Successful</DialogTitle>
                </DialogHeader>
                <div className="rounded-md bg-[rgb(219,234,254)] p-4 text-sm">
                    <div className="text-md mb-4 font-medium">Transaction Details</div>
                    <div>
                        <div className="flex justify-between">
                            <p>Package</p>
                            <p className="font-medium">{finalValues?.pck?.package_name}</p>
                        </div>
                        <Separator className="my-2" />
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <p>Amount</p>
                            <p className="font-medium">{formattedNumber(finalValues?.amount)}</p>
                        </div>
                        <Separator className="my-2" />
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <p>Date</p>
                            <p className="font-medium">{formattedDate}</p>
                        </div>
                    </div>
                </div>
                <div className="py-10 text-center">
                    <p>Payment Method</p>
                    <p className="font-medium">
                        {finalValues?.paymentMode === 1 ? 'Account Balance' : finalValues?.paymentMode === 2 ? 'Online Transfer' : ''}
                    </p>
                </div>

                <DialogFooter>
                    <Button className="w-full" onClick={(e) => handleSubmit(e)}>
                        Proceed
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
