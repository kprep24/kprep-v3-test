"use client"

import { Form } from '@/components/ui/form'
import React from 'react'
import InputField from '../inputs/InputFiled'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setupAccountSchema } from '@/schema/auth.schema';
import { z } from 'zod';
import { useSetUpAccount } from '../../api/useSetUpAccount'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import SubmitButton from '@/components/button/SubmitButton'

function SetUpForm() {
    const form = useForm<z.infer<typeof setupAccountSchema>>({
        resolver: zodResolver(setupAccountSchema),
        defaultValues: {
            password: "",
            firstName: "",
            lastName: ""
        },
    });
    const setUpAccount = useSetUpAccount();
    const params = useSearchParams();
    const router = useRouter();
    const token: string | null = params.get('token');


    // Handle form submission
    const onSubmit = (values: z.infer<typeof setupAccountSchema>) => {
        if (token) {
            setUpAccount.mutate({ ...values, token }, {
                onSuccess: () => {
                    toast("Account setup successful");
                    setTimeout(() => {
                        router.replace("/admin/sign-in");
                    }, 1000)
                },
                onError: (error: any) => {
                    toast.error("Error setting up account")
                },
            });
        }
    };
    //
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
                    <InputField
                        name="firstName"
                        control={form.control}
                        placeholder="Rohit"
                        label="First Name"
                        disable={setUpAccount.isPending}
                    />
                    <InputField
                        name="lastName"
                        control={form.control}
                        placeholder="Sharma"
                        label="Last Name"
                        disable={setUpAccount.isPending}
                    />
                   
                    <InputField
                        name="password"
                        control={form.control}
                        placeholder="****"
                        type='password'
                        label="Password"
                        disable={setUpAccount.isPending}
                    />
                    <SubmitButton disabled={setUpAccount.isPending} title="Set Up" />
                </form>
            </Form>
        </div>
    )
}

export default SetUpForm
