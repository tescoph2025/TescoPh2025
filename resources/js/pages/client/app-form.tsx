import DatePicker from '@/components/date-picker';
import { SelectInput } from '@/components/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

type PageProps = {
    success: {
        message: string;
    };
    error: {
        message: string;
    };
    auth: Auth;
    account_balance: number;
    received_transactions: {
        name: string;
        transfer_amount: number;
        updated_at: string;
    }[];
    sent_transactions: {
        name: string;
        transfer_amount: number;
        updated_at: string;
    }[];
};

export default function AppForm() {
    const { auth, success, error, type } = usePage<PageProps>().props;
    const [appDetails, setAppDetails] = useState({
        first_name: '',
        last_name: '',
        middle_name: '',
        present_address: '',
        nationality: '',
        phone_number: '',
        email: '',
        highest_education: '',
        school_name: '',
        year_graduated: '',
        source_of_income: '',
    });
    const [date, setDate] = useState();
    const [gender, setGender] = useState();
    const [employee, setEmployee] = useState({
        company_name: '',
        years_of_employment: '',
    });
    const [business_owner, setBusiness_owner] = useState({
        nature_of_business: '',
        duration_business_operation: '',
    });
    const [creditDetails, setCreditDetails] = useState({
        // monthly_income: '',
        tesco_active_deposit: '',
        tesco_monthly_income: '',
        purpose: '',
    });
    const resetForm = () => {
        setAppDetails({
            first_name: '',
            last_name: '',
            middle_name: '',
            present_address: '',
            nationality: '',
            phone_number: '',
            email: '',
            highest_education: '',
            school_name: '',
            year_graduated: '',
            source_of_income: '',
        });
        setDate(null);
        setGender(null);
        setEmployee({
            company_name: '',
            years_of_employment: '',
        });
        setBusiness_owner({
            nature_of_business: '',
            duration_business_operation: '',
        });
        setCreditDetails({
            tesco_active_deposit: '',
            tesco_monthly_income: '',
            purpose: '',
        });
    };

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const missingFields: string[] = [];

        for (const key in appDetails) {
            if (appDetails[key as keyof typeof appDetails] === '') {
                missingFields.push(key);
            }
        }

        if (!gender) {
            missingFields.push('gender');
        }
        if (!date) {
            missingFields.push('date_of_birth');
        }

        if (appDetails.source_of_income === 'employment') {
            for (const key in employee) {
                if (employee[key as keyof typeof employee] === '') {
                    missingFields.push(key);
                }
            }
        }
        if (appDetails.source_of_income === 'business_owner') {
            for (const key in business_owner) {
                if (business_owner[key as keyof typeof business_owner] === '') {
                    missingFields.push(key);
                }
            }
        }
        if (type === 'credit') {
            for (const key in creditDetails) {
                if (creditDetails[key as keyof typeof creditDetails] === '') {
                    missingFields.push(key);
                }
            }
        }

        console.log('second', missingFields);

        if (missingFields.length > 0) {
            toast.error(`Please fill in all necessary details.`);
            // toast.error(`Please fill in the following fields: ${missingFields.join(', ')}`);
            return;
        }
        const payload = { ...appDetails, gender, date_of_birth: date, app_type: type, ...employee, ...business_owner, ...creditDetails };
        console.log(payload);
        router.post('/post-appForm', payload);
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>, stateName) {
        e.preventDefault;
        const { name, value } = e.target;
        if (stateName == 'appDetails') {
            setAppDetails((prev) => ({
                ...prev,
                [name]: value,
            }));
        } else if (stateName == 'employee') {
            setEmployee((prev) => ({
                ...prev,
                [name]: value,
            }));
        } else if (stateName == 'business_owner') {
            setBusiness_owner((prev) => ({
                ...prev,
                [name]: value,
            }));
        } else if (stateName == 'creditDetails') {
            setCreditDetails((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    }

    const handleGenderChange = (val: number) => {
        setGender(val); // Update selected payment mode state
    };

    function successToast() {
        return toast.success(success.message);
    }
    function errorToast() {
        return toast.error(error.message);
    }

    useEffect(() => {
        if (success?.message) {
            successToast();
            resetForm(); // Reset form on success
        }
        error?.message && errorToast();
    }, [success, error]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: type == 'franchise' ? 'Franchise Application' : 'Tesco Credit Application',
            href: type == 'franchise' ? '/transfer-fund' : '/transfer-fund',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col items-center gap-y-4 p-4">
                <div className="w-full max-w-[900px]">
                    <Card className="p-4">
                        <div className="flex flex-col gap-4">
                            <p
                                style={{ backgroundColor: type == 'franchise' ? 'rgb(238, 28, 46)' : '#00539f', color: 'white' }}
                                className="rounded-md px-2 py-2 font-medium"
                            >
                                PERSONAL INFORMATION
                            </p>
                            <div className="flex flex-col gap-2 px-3">
                                <Label>Name</Label>
                                <span className="flex flex-col gap-4 lg:flex-row">
                                    <Input
                                        name="last_name"
                                        placeholder="Last Name"
                                        value={appDetails.last_name}
                                        onChange={(e) => onChange(e, 'appDetails')}
                                    />
                                    <Input
                                        name="first_name"
                                        placeholder="First Name"
                                        value={appDetails.first_name}
                                        onChange={(e) => onChange(e, 'appDetails')}
                                    />
                                    <Input
                                        name="middle_name"
                                        placeholder="Middle Name"
                                        value={appDetails.middle_name}
                                        onChange={(e) => onChange(e, 'appDetails')}
                                    />
                                </span>
                                <span className="flex flex-col gap-4 lg:flex-row">
                                    <div className="w-full">
                                        <Label>Gender</Label>
                                        <SelectInput
                                            disabled={false}
                                            value={gender}
                                            placeholder="Select a Package"
                                            items={[
                                                { text: 'Male', value: 'm' },
                                                { text: 'Female', value: 'f' },
                                                { text: 'Other', value: 'o' },
                                            ]}
                                            className="w-full"
                                            onChange={handleGenderChange}
                                        />
                                    </div>
                                    <div className="flex w-full flex-col justify-between">
                                        <Label className="mt-1.5">Date of Birth</Label>
                                        <DatePicker date={date} setDate={setDate} />
                                    </div>
                                </span>
                                <span className="flex flex-col gap-4 lg:flex-row">
                                    <div className="w-full">
                                        <Label>Nationality</Label>
                                        <Input
                                            name="nationality"
                                            placeholder="Nationality"
                                            value={appDetails.nationality}
                                            onChange={(e) => onChange(e, 'appDetails')}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Label>Present Address</Label>
                                        <Input
                                            name="present_address"
                                            placeholder="Present Address"
                                            value={appDetails.present_address}
                                            onChange={(e) => onChange(e, 'appDetails')}
                                        />
                                    </div>
                                </span>
                                <span className="flex flex-col gap-4 lg:flex-row">
                                    <div className="w-full">
                                        <Label>Phone Number</Label>
                                        <Input
                                            name="phone_number"
                                            placeholder="Phone Number"
                                            value={appDetails.phone_number}
                                            onChange={(e) => onChange(e, 'appDetails')}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Label>E-mail Address</Label>
                                        <Input
                                            name="email"
                                            placeholder="E-mail Address"
                                            value={appDetails.email}
                                            onChange={(e) => onChange(e, 'appDetails')}
                                        />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p
                                style={{ backgroundColor: type == 'franchise' ? 'rgb(238, 28, 46)' : '#00539f', color: 'white' }}
                                className="rounded-md px-2 py-2 font-medium"
                            >
                                Education
                            </p>
                            <div className="flex flex-col gap-2 px-3">
                                <span className="flex flex-col gap-4 lg:flex-row">
                                    <div className="w-full">
                                        <Label>Highest Educational Attainment</Label>
                                        <Input
                                            name="highest_education"
                                            placeholder="Highest Educational Attainment"
                                            value={appDetails.highest_education}
                                            onChange={(e) => onChange(e, 'appDetails')}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Label>Year Graduated</Label>
                                        <Input
                                            name="year_graduated"
                                            placeholder="Year"
                                            value={appDetails.year_graduated}
                                            onChange={(e) => onChange(e, 'appDetails')}
                                        />
                                    </div>
                                </span>
                                <span className="flex flex-col gap-4 lg:flex-row">
                                    <div className="w-full">
                                        <Label>Name of School/College/University</Label>
                                        <Input
                                            name="school_name"
                                            placeholder="School/College/University"
                                            value={appDetails.school_name}
                                            onChange={(e) => onChange(e, 'appDetails')}
                                        />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p
                                style={{ backgroundColor: type == 'franchise' ? 'rgb(238, 28, 46)' : '#00539f', color: 'white' }}
                                className="rounded-md px-2 py-2 font-medium"
                            >
                                SOURCE OF INCOME
                            </p>
                            <div className="flex flex-col gap-2 px-3">
                                <div className="grid gap-2">
                                    <Label htmlFor="gender">Source</Label>
                                    <RadioGroup
                                        name="source_of_income"
                                        id="source_of_income"
                                        value={appDetails.source_of_income}
                                        onValueChange={(value) =>
                                            setAppDetails((prev) => ({
                                                ...prev,
                                                source_of_income: value,
                                            }))
                                        }
                                        className="flex"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="employment" id="employment" />
                                            <Label htmlFor="employment">Employment</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="business_owner" id="business_owner" />
                                            <Label htmlFor="business_owner">Business Owner</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className={` ${appDetails.source_of_income == 'employment' ? 'visible' : 'collapse h-0'}`}>
                                    <div>
                                        <span className="flex flex-col gap-4 lg:flex-row">
                                            <div className="w-full">
                                                <Label>Company Name</Label>
                                                <Input
                                                    name="company_name"
                                                    placeholder="Company Name"
                                                    value={employee.company_name}
                                                    onChange={(e) => onChange(e, 'employee')}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <Label>Years of Employment</Label>
                                                <Input
                                                    name="years_of_employment"
                                                    placeholder="Years"
                                                    value={employee.years_of_employment}
                                                    onChange={(e) => onChange(e, 'employee')}
                                                />
                                            </div>
                                        </span>
                                    </div>
                                    {/* <span
                                        className={`collapse flex h-[0px] flex-col gap-4 lg:flex-row ${type == 'credit' && appDetails.source_of_income == 'employment' && 'visible h-auto'}`}
                                    >
                                        <div className="w-full">
                                            <Label>Gross Monthly Income</Label>
                                            <Input
                                                name="monthly_income"
                                                placeholder="Monthly Income"
                                                value={creditDetails.monthly_income}
                                                onChange={(e) => onChange(e, 'creditDetails')}
                                            />
                                        </div>
                                    </span> */}
                                </div>
                                <div className={` ${appDetails.source_of_income == 'business_owner' ? 'visible' : 'collapse h-0'}`}>
                                    <div>
                                        <span className="flex flex-col gap-4 lg:flex-row">
                                            <div className="w-full">
                                                <Label>Nature of Business</Label>
                                                <Input
                                                    name="nature_of_business"
                                                    placeholder="Nature of Business"
                                                    value={business_owner.nature_of_business}
                                                    onChange={(e) => onChange(e, 'business_owner')}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <Label>Duration of Business Operation</Label>
                                                <Input
                                                    name="duration_business_operation"
                                                    placeholder="Years"
                                                    value={business_owner.duration_business_operation}
                                                    onChange={(e) => onChange(e, 'business_owner')}
                                                />
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* className={`collapse flex h-[0px] w-full flex-col gap-4 lg:flex-row ${type == 'credit' && 'visible h-auto'}`} */}
                        <div className={`collapse flex h-[0px] w-full flex-col gap-4 ${type == 'credit' && 'visible h-auto'}`}>
                            <p
                                style={{ backgroundColor: type == 'franchise' ? 'rgb(238, 28, 46)' : '#00539f', color: 'white' }}
                                className="rounded-md px-2 py-2 font-medium"
                            >
                                ADDITIONAL INFORMATION
                            </p>
                            <div className="flex flex-col gap-2 px-3">
                                <span className="flex flex-col gap-4 lg:flex-row">
                                    <div className="w-full">
                                        <Label>Tesco Active Deposit Amount</Label>
                                        <Input
                                            name="tesco_active_deposit"
                                            placeholder="Active Deposit Amount"
                                            value={creditDetails.tesco_active_deposit}
                                            onChange={(e) => onChange(e, 'creditDetails')}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Label>Tesco Monthly Income</Label>
                                        <Input
                                            name="tesco_monthly_income"
                                            placeholder="Monthly Income"
                                            value={creditDetails.tesco_monthly_income}
                                            onChange={(e) => onChange(e, 'creditDetails')}
                                        />
                                    </div>
                                </span>
                                <span className="flex flex-col gap-4 lg:flex-row">
                                    <div className="w-full">
                                        <Label>Purpose of Loan</Label>
                                        <Input
                                            name="purpose"
                                            placeholder="Loan Purpose"
                                            value={creditDetails.purpose}
                                            onChange={(e) => onChange(e, 'creditDetails')}
                                        />
                                    </div>
                                </span>
                            </div>
                        </div>

                        <div className="my-5 flex justify-center">
                            <Button onClick={handleSubmit} className="px-20">
                                Submit
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
