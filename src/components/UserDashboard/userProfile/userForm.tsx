"use client"

import SubmitButton from '@/components/button/SubmitButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form';
import { InputField, SelectField } from '@/features/(admin)/components/InputField/InputFiled';
import useSignIn from '@/features/(auth)/api/useSignIn';
import getBranchList from '@/features/(main)/api/getBranchList';
import { useSetUpUser } from '@/features/(main)/api/useSetUpUser';
import { userSchema } from '@/schema/user.schema';
import { useUserInfo } from '@/store/AuthStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useRouter } from 'next/navigation';


interface IUserForm {
    defaultValues: z.infer<typeof userSchema>;
}

interface IBranch {
    id: string;
    shortName: string
}
function UserForm({ defaultValues }: IUserForm) {
    const router = useRouter();
    const { data } = useSession();
    const { updateUserInfo } = useUserInfo();
    console.log(data)
    const userModify = useSetUpUser();
    const branchList = getBranchList('679e5867950fff523f5cefcb');
    const branchdata: IBranch[] = branchList.data || [];
    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues,
    });
    const lists = branchdata.map((item) => ({
        value: item.id,
        title: item.shortName
    }));
    let SemList = [];
    if (form.watch("year") === "One") {
        SemList = ["One", "Second"];
    } else if (form.watch("year") === "Two") {
        SemList = ["Third", "Fourth"];
    } else if (form.watch("year") === "Three") {
        SemList = ["Fifth", "Sixth"];
    } else {
        SemList = ["Seventh", "Eighth"];
    }
    const onSubmit = (values: z.infer<typeof userSchema>) => {
        console.log("ID IS", data?.user.id)
        console.log(form.formState.errors)
        if (data?.user.id) {
            userModify.mutate({
                branchId: values.branchId,
                semester: values.semester,
                year: values.year,
                id: data?.user.id,
                name: values.name,
                email: values.email
            }, {
                onSuccess: () => {
                    updateUserInfo({ branchId: values.branchId, email: values.email, isVerified: true, name: values.name, semester: values.semester, year: values.year, userId: data?.user.id, isLocked: true })
                    toast("Successfully Updated");
                    router.replace("/userboard");
                }
                , onError: (error: any) => {
                    console.log(error)
                }
            })
        }
    }
    return (
        <Card className='bg-transparent  dark:text-black text-black w-2xl'>
            <CardHeader>
                <CardTitle className='text-3xl text-center'>Welcome to Our Platform!</CardTitle>
                <CardDescription className='text-center text-black'>Fill out the form below to set up your account and get started.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 dark:text-black text-black">
                        <InputField
                            name="name"
                            form={form.control}
                            placeholder="Json"
                            label="Full Name"
                            readonly={true}
                            disabled={userModify.isPending}
                        />
                        <InputField
                            name="email"
                            form={form.control}
                            placeholder="ab@gmail.com"
                            label="Email"
                            readonly={true}
                            disabled={userModify.isPending}
                        />
                        <div className="row flex gap-2 md:flex-row flex-col">
                            <SelectField
                                // disabled={loading}
                                width="md:w-[40%] w-[100%]"
                                options={lists}
                                label={'Branch Selection'}
                                placeholder='Select Branch'
                                form={form.control}
                                name={`branchId`}
                                disabled={userModify.isPending}
                            />
                            <SelectField
                                // disabled={loading}
                                width="md:w-[40%] w-[100%]"
                                list={["One", "Two", "Three", "Four"]}
                                label={'Year'}
                                form={form.control}
                                name={`year`}
                                disabled={userModify.isPending}
                            />
                              {/*   <SelectField
                                // disabled={loading}
                                width="md:w-[40%] w-[100%]"
                                list={SemList}
                                label={'Semester Selection'}
                                form={form.control}
                                name={`semester`}
                                disabled={userModify.isPending}
                            />

                            {/* Branch Selection */}

                        </div>
                        <SubmitButton title="Register" disabled={userModify.isPending} />
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default UserForm
