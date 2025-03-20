"use client";

import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import SubmitButton from '@/components/button/SubmitButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { feebackFormSchema } from '@/schema/feedback.schema';
import { useAddFeedback } from '@/features/(admin)/api/reports_feedbacks/use-add-feedback';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';


export type feebackFormSchemaType = z.infer<typeof feebackFormSchema>;

function Feedback() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<feebackFormSchemaType>({
        resolver: zodResolver(feebackFormSchema),
    });
    const selectTexts = ["Request for New Feature", "Feedback", "Report a Bug"];
    const { data } = useSession();
    const feedback = useAddFeedback(data?.user.id!);
    const submitHandler = (data: feebackFormSchemaType) => {
        // console.log(data.category, data.text)
        feedback.mutate({
            category: data.category, text: data.text
        },
            {
                onSuccess: () => {
                    reset();
                    toast("Feedback Successfully added");
                },
                onError: (error) => {
                    toast('Failed to submit feedback:' + error.message || "Error on submit");
                }
            }
        )
    };

    return (
        <div className='main_wrapper w-full'>
            <div className="main mx-auto w-[450px] p-4 rounded-md border dark:border-slate-900 border-slate-200 ">
                <div className="header">
                    <div className="title text-xl">
                        Provide Your Feedback
                    </div>
                    <div className="subtitle">
                        Help us improve your study experience!
                    </div>
                </div>
                <div className="form_box my-4">
                    <form
                        onSubmit={handleSubmit(submitHandler)}
                        className="w-full max-w-md space-y-8"
                    >
                        <div className="input_row">
                            <label>Category</label>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Select disabled={feedback.isPending} onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full mt-2">
                                            <SelectValue placeholder={selectTexts[0]} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {selectTexts.map((item, i) => (
                                                    <SelectItem key={i} value={item}>{item}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.category && <p className='text-red-500'>{errors.category.message}</p>}
                        </div>
                        <div className="input_row my-2">
                            <label>Your Feedback</label>
                            <Textarea
                                {...register("text")}
                                name='text'
                                disabled={feedback.isPending}
                                className='mt-2 min-h-[150px]'
                                placeholder="Type your message here."
                            />
                            {errors.text && <p className='text-red-500'>{errors.text.message}</p>}
                        </div>
                        <SubmitButton disabled={feedback.isPending} title='Submit Feedback' />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Feedback;