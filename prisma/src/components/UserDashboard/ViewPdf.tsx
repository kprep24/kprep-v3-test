"use client"

import { usePathname } from "next/navigation";
import React from "react";
// import { useSearchParams } from "next/navigation";
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

const ViewPdf: React.FC = () => {

  const path = usePathname();
  
  // userboard/viewPdf
  // const searchParams = useSearchParams();
  // const pdfUrl = searchParams.get('pdfUrl');

  return (
    <div className="flex justify-center items-center h-screen">
      {/* {pdfUrl && (
        <Document file={pdfUrl}>
          <Page pageNumber={1} />
        </Document>
      )} */}
    </div>
  );
};

export default ViewPdf;
