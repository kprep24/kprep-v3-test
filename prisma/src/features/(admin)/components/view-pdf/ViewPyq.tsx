"use client";
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { degrees, PDFDocument, rgb } from "pdf-lib";
import getPdf from "@/features/(main)/api/getPdf";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import getPyqUrl from "@/features/(main)/api/getPyqUrl";
import ViewCloudnaryPyq from "./ViewCloudnaryPyq";
import PDFSkeletonLoader from "@/components/PDFLoading/PDFSkeletonLoader";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ViewPyq = () => {
  const { data } = useSession();
  const param = useSearchParams();
  const id = param.get("id") || "";
  const { data: pdfFileUrl, isLoading, error, isError } = getPyqUrl(data?.user?.id || "", id);
  // console.log(pdfFileUrl?.pyqUrl)
  if (isLoading)
    return <PDFSkeletonLoader />

  return <>
    {pdfFileUrl && pdfFileUrl.pyqUrl.startsWith("https://drive.google.com") ? <iframe src={pdfFileUrl?.pyqUrl} width="100%" height="600px">
    </iframe> : <ViewCloudnaryPyq pdfFileUrl={pdfFileUrl} isLoading={false} error={error} isError={isError} />}
  </>
};

export default ViewPyq;
