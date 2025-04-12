import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import bgImage from '../images/1.jpg';

export default function AuthLayout2({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundPositionX: '-20rem',
                }}
                className="bg-muted relative hidden overflow-hidden bg-cover bg-no-repeat lg:block"
            >
                {/* <img
                    src="/placeholder.svg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                /> */}
            </div>
            <div className="flex h-screen flex-col gap-4 overflow-auto p-6 md:p-10">
                <div className="flex justify-center justify-start gap-2">
                    <Link
                        href={route('home')}
                        className="text-md flex items-center gap-2 rounded-sm px-3 py-1.5 text-sm font-semibold text-[#00539f] hover:underline"
                    >
                        <ArrowLeft className="size-4" />
                        Back
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="flex w-full max-w-sm flex-col justify-center gap-7 px-5">{children}</div>
                </div>
            </div>
        </div>
    );
}
