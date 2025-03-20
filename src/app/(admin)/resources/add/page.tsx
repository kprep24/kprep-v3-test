import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ResourcesForm from '@/features/(admin)/components/resources/ResourcesForm'
import React from 'react'

function page() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Resources</CardTitle>
                <CardDescription>
                    Upload and manage chapter-wise resources for each subject to help students access study materials easily.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ResourcesForm />
            </CardContent>
        </Card>
    )
}

export default page
