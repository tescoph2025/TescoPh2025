import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Link } from '@inertiajs/react';
import { TriangleAlert } from 'lucide-react';

export default function NoBankDialog({ open }) {
    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]">
                <div className="flex flex-col items-center">
                    <TriangleAlert size={48} color="#ffc107" />
                    <p className="mt-3 font-light">Bank details is required before proceeding to withdrawal.</p>
                </div>

                <DialogFooter>
                    {/* <Button variant={'ghost'} onClick={() => onSelect(null)}>
                        Close
                    </Button>
                    <Button onClick={handleAvail}>Avail</Button> */}
                    <Link
                        href={route('dashboard')}
                        className="inline-block rounded-sm border border-transparent bg-[#00539f] px-5 py-1.5 text-sm leading-normal font-bold text-[white] hover:border-[#19140035]"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href={route('profile.bank')}
                        className="inline-block rounded-sm border border-[#00539f] px-5 py-1.5 text-sm leading-normal font-bold text-[#00539f] hover:border-[#00539f]"
                    >
                        Bank Details
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
