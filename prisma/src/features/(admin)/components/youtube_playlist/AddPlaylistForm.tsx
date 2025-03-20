"use client"

import SubmitButton from '@/components/button/SubmitButton'
import { Form } from '@/components/ui/form'
// import InputField from '@/features/(auth)/components/inputs/InputFiled'
import React from 'react'
import { InputField, SelectField } from '../InputField/InputFiled'
import { useGetDurationList } from '@/hooks/use-get-duration-lists'
import { useGetSubjects } from '@/hooks/use-get-subjects'
import { useForm } from 'react-hook-form'
import { addPyqSchema } from '@/schema/pyq.schema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddPyq } from '../../api/pyq/useAddPyq'
import { playlistSchema } from '@/schema/playlist.schema'
import { useAddPlaylist } from '../../api/playlist/use-add-playlist'
import { toast } from 'sonner'

interface IAddPyq {
    defaultValues: z.infer<typeof playlistSchema>
}


function AddPlaylistForm({ defaultValues }: IAddPyq) {
    const form = useForm<z.infer<typeof playlistSchema>>({
        resolver: zodResolver(playlistSchema),
        defaultValues,
    });
    let courseId = null;
    courseId = form.watch("courseId");
    const { courseList, durationList } = useGetDurationList(courseId);
    const extractSubjectList = useGetSubjects(courseId, form.watch("year"));
    const addPlaylist = useAddPlaylist();
    function onSubmit(values: z.infer<typeof playlistSchema>) {
        addPlaylist.mutate(values, {
            onSuccess: () => {
                toast("Successfully added");
                // form.reset();
            },
            onError: (error) => {
                toast("Failed to create playlist")
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <InputField
                    name='title'
                    placeholder='e.g., Operating Systems - Midterm Preparation'
                    label='Playlist Title'
                    form={form.control}
                    disabled={addPlaylist.isPending}
                />
                <div className="first_row flex gap-4">
                    <SelectField
                        placeholder='Select a Course'
                        name="courseId"
                        options={courseList && courseList}
                        label='Course'
                        form={form.control}
                        disabled={addPlaylist.isPending}
                    />
                    <SelectField
                        placeholder='Select Year'
                        name="year"
                        list={durationList}
                        label='Academic Year'
                        form={form.control}
                        disabled={durationList.length == 0 || addPlaylist.isPending}
                    />
                    <SelectField
                        placeholder='Select a Subject'
                        name="subjectId"
                        options={extractSubjectList && extractSubjectList}
                        label='Subject'
                        form={form.control}
                        disabled={extractSubjectList.length == 0 || addPlaylist.isPending}
                    />
                </div>
                <div className="first_row flex gap-4">
                    <InputField
                        placeholder='12'
                        name="noOfVideos"
                        // type='number'
                        // options={courseList && courseList}
                        label='Total Videos'
                        form={form.control}
                        disabled={addPlaylist.isPending}
                    />
                    <InputField
                        placeholder='Gate Smashers'
                        name="chName"
                        // list={durationList}
                        label='Channel Name'
                        
                        form={form.control}
                        disabled={ addPlaylist.isPending}
                    />
                    <InputField
                        placeholder='4.2'
                        name="rating"
                        // type=''
                        // options={extractSubjectList && extractSubjectList}
                        label='Rating'
                        form={form.control}
                        disabled={ addPlaylist.isPending}
                    />
                </div>

                <InputField
                    name='link'
                    placeholder='e.g., https://www.youtube.com/playlist?list=PLfqMhT'
                    label='Playlist URL'
                    form={form.control}
                    disabled={addPlaylist.isPending}
                />

                <SubmitButton
                    title='Add Playlist'
                    disabled={addPlaylist.isPending}
                />
            </form>
        </Form>

    )
}

export default AddPlaylistForm
