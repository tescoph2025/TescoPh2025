import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReceivingBank } from '@/pages/client/package';
import { router } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ScrollArea } from '../../ui/scroll-area';

interface PackageModalProps {
    open: boolean;
    onOpen: () => void;
    receiving_bank: ReceivingBank[];
}

export function RequestFundPayment({ open, onOpen, receiving_bank }: PackageModalProps) {
    const [exchangeRate, setExchangeRate] = useState<number>();
    const [exchangeUpdate, setExchangeUpdate] = useState(null);
    const [error, setError] = useState(null);
    const [requestamount, setrequestamount] = useState<string>();
    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await fetch('https://v6.exchangerate-api.com/v6/51ce13bf15b77463bfc2fe26/latest/USD');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('dollar', data);
                setExchangeRate(data.conversion_rates.PHP);
                setExchangeUpdate(data.time_last_update_utc);
            } catch (error) {
                // setError(error);
                console.log(error);
            }
        };

        fetchExchangeRate();
    }, []);

    const exchangeRateToShow = exchangeRate ?? 0; // Fallback to 0 if exchangeRate is undefined

    const handleSubmit = (e: FormEvent, bank_id: number) => {
        if (Number(requestamount) <= 0 || requestamount === undefined) {
            return toast.error('Required amount');
        }
        e.preventDefault();

        router.post('/postrequest-fund', {
            bank_id: bank_id, // From useState
            amount: requestamount, // From useState
        });
        onOpen();
        setrequestamount('');
    };

    function handleRequestAmount(event: React.ChangeEvent<HTMLInputElement>) {
        setrequestamount(event.target.value);
        console.log({ requestamount }); // Update the state with the new value
    }

    return (
        <Dialog open={open} onOpenChange={onOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Request Fund</DialogTitle>
                </DialogHeader>
                <ScrollArea className="overflow-auto rounded-md border">
                    <div className="mx-auto flex flex-1 flex-col gap-4 rounded-xl p-4">
                        <div className="">
                            {receiving_bank ? (
                                <>
                                    <Tabs defaultValue="bpi" className="w-full">
                                        <TabsList className="grid w-full grid-cols-2">
                                            {receiving_bank.map((item) => (
                                                <TabsTrigger value={String(item.id)} key={item.id}>
                                                    {item.bank_name}
                                                </TabsTrigger>
                                            ))}
                                        </TabsList>
                                        {receiving_bank.map((item) => (
                                            <TabsContent value={String(item.id)} key={item.id}>
                                                <div className="rounded-md py-5">
                                                    <Input
                                                        placeholder="Enter your desire amount"
                                                        type="number"
                                                        value={requestamount}
                                                        onChange={handleRequestAmount}
                                                    />
                                                    <Label className="mt-4 ml-2">Amount</Label>
                                                </div>
                                                {/* <div className="rounded-md bg-red-100 p-4 text-black">
                                                    <div className="pb-3">
                                                        <span className="text-accent-foreground text-xs">Receiving Bank: </span>
                                                        <span className="text-sm font-bold">{item.receiving_bank}</span>
                                                    </div>
                                                    <div className="pb-3">
                                                        <span className="text-accent-foreground text-xs">Payment Channel: </span>
                                                        <span className="text-sm font-bold"> {item.payment_channel}</span>
                                                    </div>
                                                    <div className="pb-3">
                                                        <span className="text-accent-foreground text-xs">Account Name: </span>
                                                        <span className="text-sm font-bold"> {item.account_name}</span>
                                                    </div>
                                                    <div className="pb-7">
                                                        <span className="text-accent-foreground text-xs">Account Number: </span>
                                                        <span className="text-sm font-bold"> {item.account_number}</span>
                                                    </div>

                                                    <div className="text-sm">
                                                        <ol className="space-y-2">
                                                            <li>
                                                                1. Copy the above <span className="font-bold text-red-500">Account Number</span>.
                                                            </li>
                                                            <li>2. Log into your online banking account.</li>
                                                            <li>3. Select "Send Money or Transfer Funds to other banks".</li>
                                                            <li>
                                                                4. Select <span className="font-bold text-red-500">{item.receiving_bank}</span>.
                                                            </li>
                                                            <li>
                                                                5. Pay via <span className="font-bold text-red-500">INSTAPAY</span>.
                                                            </li>
                                                            <li>6. Enter or paste the above Account Number in account number field.</li>
                                                            <li>
                                                                7. Once complete - confirm payment, save image and send to{' '}
                                                                <span className="font-bold text-red-500"> tesciphilippines2025@gmail.com</span>.
                                                            </li>
                                                        </ol>
                                                    </div>
                                                    <div className="text-accent-foreground py-8 text-center text-sm">
                                                        <p>or</p>
                                                    </div>
                                                    <div className="flex justify-center">
                                                        <img src={item.id == 1 ? '/bpi_qr.jpg' : '/rcbc_qr.jpg'} alt="" width={170} height={170} />
                                                    </div>
                                                    <div className="mt-2 text-center text-sm">
                                                        <p>Scan this QR-code using your preferred mobile banking app.</p>
                                                    </div>
                                                    <div className="mt-8 text-center text-sm">
                                                        <Button onClick={(e) => handleSubmit(e, item.id)} className="w-24 bg-red-500">
                                                            Request
                                                        </Button>
                                                    </div>
                                                </div> */}
                                                <div className="text-center text-sm">
                                                    <Button onClick={(e) => handleSubmit(e, item.id)} className="w-24 bg-red-500">
                                                        Request
                                                    </Button>
                                                </div>
                                            </TabsContent>
                                        ))}
                                    </Tabs>
                                </>
                            ) : (
                                <>No Available Banks</>
                            )}
                        </div>
                    </div>
                </ScrollArea>
                {/* <DialogFooter>
        <Button className="w-full" onClick={onOpen}>Proceed</Button>
        </DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
}
