import { Form } from '@/components/ui/form';
import { editAdminSchema } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SelectField, SwitchField } from '../InputField/InputFiled';
import SubmitButton from '@/components/button/SubmitButton';
import useModifyAdmin from '../../api/administration/useModifyAdmin';

import { useOpenSheet } from '../../hooks/useOpenSheet';
import { roles } from '@/constants/roles';
import { toast } from 'sonner';

interface EditAdminstrationFormProps {
    defaultValues: z.infer<typeof editAdminSchema>
    id: string
    disabled: boolean
}

function EditAdminstrationForm({ defaultValues, id, disabled }: EditAdminstrationFormProps) {



    const editMutation = useModifyAdmin();
    const { onClosed } = useOpenSheet()

    function onSubmit(values: z.infer<typeof editAdminSchema>) {
        editMutation.mutate({ id: id, isBan: values.isBan, role: values.role }, {
            onSuccess: () => {
                toast("Successfully updated user")
                onClosed();
            },
            onError: (error: any) => {
                toast(error.message || "Error updating user",)
                onClosed();
            }
        })
    }

    const form = useForm<z.infer<typeof editAdminSchema>>({
        resolver: zodResolver(editAdminSchema),
        defaultValues,
    })



    return (
        <div className='mt-3'> <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <SwitchField
                    form={form.control}
                    title="Ban the User"
                    description="If you ban the user, they will no longer have access to the dashboard."
                    name="isBan"
                />
                <SelectField
                    form={form.control}
                    name='role'
                    list={roles}
                    label='Role'
                    placeholder='Select Role'
                    defaultValue={defaultValues.role}
                />
                <SubmitButton  disabled={editMutation.isPending} title='Modify User' />


            </form>
        </Form></div>
    )
}

export default EditAdminstrationForm
