"use client"
import React from 'react'
import CardBox from '../cardBox/CardBox'
import { Form } from '@/components/ui/form'
import InputField from '../inputs/InputFiled'
import { Button } from '@/components/ui/button'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { forgotSchema } from '@/schema/auth.schema'

function Forgot() {


    const form = useForm<z.infer<typeof forgotSchema>>({
        resolver: zodResolver(forgotSchema),
        defaultValues: {
            email: "",
            // password: ""
        },
    });

    // Handle form submission
    const onSubmit = (values: z.infer<typeof forgotSchema>) => {
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
                        name="email"
                        control={form.control}
                        placeholder="ab@gmail.com"
                        label="Email"
                    />
                    <Button className="w-full bg-white text-black" type="submit">Send Magic Link</Button>
                </form>
            </Form>
        </CardBox>
    )
}

export default Forgot
