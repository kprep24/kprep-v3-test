"use client"

import PDFSkeletonLoader from '@/components/PDFLoading/PDFSkeletonLoader';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import useGetSheetPdf from '../../api/formula_sheet/get-sheet-pdf';

function ViewSheet() {
    const param = useSearchParams();
    const id = param.get("id") || "";
    const { data } = useSession();
    const { data: pdfFileUrl, isLoading, error, isError } = useGetSheetPdf(data?.user?.id || "", id);
    console.log(pdfFileUrl)
    if (isLoading) {
        return <PDFSkeletonLoader />
    }
    if (isError) {
        return <p>Error: {error.message || "Error Occured"}</p>
    }
    // console.log(pdfFileUrl)
    return (
        <div>
            <iframe src={pdfFileUrl} width="100%" height="600px"></iframe>
        </div>
    )
}

export default ViewSheet
