"use client"
import React from 'react'
import CardBox from '../cardBox/CardBox';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import InputField from '../inputs/InputFiled';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { changePasswordSchema } from '@/schema/auth.schema';

function ChangePassword() {
    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    // Handle form submission
    const onSubmit = (values: z.infer<typeof changePasswordSchema>) => {
        console.log("Form Values:", values);
    };

    return (
        <CardBox
            title='Forgot Your Password?'
            description='Don’t worry! Enter your email to reset your password and regain access to your account'
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <InputField
                        name="password"
                        control={form.control}
                        placeholder=""
                        type='password'
                        label="Password"
                    />
                    <InputField
                        name="confirmPassword"
                        control={form.control}
                        placeholder=""
                        type='password'
                        label="Confirm Password"
                    />
                    <Button className="w-full bg-white text-black" type="submit">Send Magic Link</Button>
                </form>
            </Form>
        </CardBox>
    )
}

export default ChangePassword
