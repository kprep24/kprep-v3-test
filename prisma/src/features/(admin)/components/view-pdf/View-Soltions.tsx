"use client"

import PDFSkeletonLoader from '@/components/PDFLoading/PDFSkeletonLoader';
import getSoltion from '@/features/(main)/api/getSol';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react'

function ViewSoltions() {
    const param = useSearchParams();
    const id = param.get("id") || "";
    const { data } = useSession();
    const { data: pdfFileUrl, isLoading, error, isError } = getSoltion(data?.user?.id || "", id);
    if (isLoading) {
        return <PDFSkeletonLoader />
    }
    if (isError) {
        return <p>Error: {error.message || "Error Occured"}</p>
    }
    // console.log(pdfFileUrl)
    return (
        <div>
            <iframe src={pdfFileUrl.solutionUrl} width="100%" height="600px"></iframe>
        </div>
    )
}

export default ViewSoltions
