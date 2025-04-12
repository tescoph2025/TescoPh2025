import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';

interface CustomDialogProps {
    label: string;
    type: string;
    ref?: string;
}
export function CustomDialog({ label, type, ref }: CustomDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-20" variant="outline">
                    {label}
                </Button>
            </DialogTrigger>
            <DialogContent className="w-auto">
                <div className="flex items-center justify-center">
                    {type === 'login' ? <Login status="" canResetPassword={true} /> : <Register ref={ref} />}
                    {/* <CustomCarousel /> */}
                </div>
            </DialogContent>
        </Dialog>
    );
}
