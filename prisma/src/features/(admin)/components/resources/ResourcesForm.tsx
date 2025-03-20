"use client";

import React from 'react'
import AddForm from './AddForm'
import { useSearchParams } from 'next/navigation';
import useGetresourcesById from '../../api/resources/useGetresourcesById';
import { IResource } from '../../types/resources.types';
import EditForm from './EditForm';

function ResourcesForm() {

    const params = useSearchParams();
    const resourceId = params.get('id');
    const resource = useGetresourcesById(resourceId);
    const resourcedata: IResource = resource.data || null;
    return (
        <div>
            {
                resourceId && resourcedata ? <EditForm
                    defaultValues={{
                        title: resourcedata.title,
                        description: resourcedata.description,
                        courseId: resourcedata.ResourcesDetails.courseId,
                        subjectId: resourcedata.subjectId,
                        year: resourcedata.ResourcesDetails.year,
                        noteVisibility: resourcedata.visibility,
                        noteType: resourcedata.contentType,
                        freemium: resourcedata.freemium,
                    }}
                /> :

                    <AddForm
                        defaultValues={{
                            title: "",
                            description: "",
                            courseId: "",
                            subjectId: "",
                            year: "",
                            // resourceUrl: "",
                            noteVisibility: "Private",
                            noteType: "Slide",
                            freemium: "Premium",
                        }}
                    />}
        </div>
    )
}

export default ResourcesForm
