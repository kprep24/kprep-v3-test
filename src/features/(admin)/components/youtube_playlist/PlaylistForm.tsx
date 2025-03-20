import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import AddPlaylistForm from './AddPlaylistForm'

function PlaylistForm() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Subject-wise Playlists</CardTitle>
                <CardDescription>Organize and access curated playlists for each subject. Add new playlists effortlessly using the form below.</CardDescription>
            </CardHeader>
            <CardContent>
                <AddPlaylistForm defaultValues={{
                    courseId: '',
                    subjectId: '',
                    title: '',
                    link: "",
                    year:"",
                    chName: "",
                    noOfVideos: "",
                    rating: ""
                }} />
            </CardContent>
        </Card>
    )
}

export default PlaylistForm
