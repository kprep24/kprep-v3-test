import { Form } from '@/components/ui/form';
import { invitationSchema } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { InputField, SelectField } from '../InputField/InputFiled';
import { roles } from '@/constants/roles';
import { Button } from '@/components/ui/button';
import { useAddAdmins } from '../../api/administration/useAddAdmin';
import SubmitButton from '@/components/button/SubmitButton';
import useAuthStore from '@/store/AuthStore';
import { toast } from 'sonner';
import { useOpenSheet } from '../../hooks/useOpenSheet';
interface AddNewAdministrationProps {
  defaultValues: z.infer<typeof invitationSchema>
}

function AddNewAdministration({ defaultValues }: AddNewAdministrationProps) {



  const inviteAdmin = useAddAdmins();
  const { id } = useAuthStore();
  const { onClosed } = useOpenSheet();
  function onSubmit(values: z.infer<typeof invitationSchema>) {
    inviteAdmin.mutate({
      userId: id,
      role: values.role,
      email: values.email,
      firstName: values.firstName
    }, {
      onSuccess: () => {
        toast("Invitation successfully sent!");
        onClosed();
      },
      onError: (error) => {
        toast(error.message || "Error sending invitation");
        onClosed();
      }
    });
  }

  const form = useForm<z.infer<typeof invitationSchema>>({
    resolver: zodResolver(invitationSchema),
    defaultValues,
  })

  const option = ['admin', 'super-admin', 'user'];

  return (
    <div className='mt-3'> <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <InputField
          form={form.control}
          name='firstName'
          placeholder='Avik'
          label='First Name'
        />
        <InputField
          form={form.control}
          name='email'
          placeholder='avik@gmail.com'
          label='Email'
        />
        <SelectField
          list={roles}
          name="role"
          placeholder="Select a role"
          label="Role"
          form={form.control}
        />
        <SubmitButton title='Add' disabled={inviteAdmin.isPending} />
      </form>
    </Form></div>
  )
}

export default AddNewAdministration
