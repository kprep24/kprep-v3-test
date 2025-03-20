"use client"
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`; // Use current version



const ViewPDf = () => {
  const [numPages, setNumPages] = React.useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }:{numPages: number}) {
    setNumPages(numPages);
  }

  const pdfUrl = "https://res.cloudinary.com/dbnqbmrak/image/upload/v1739230456/pdfs/obfwbzvefbleyyh9960l.pdf"; // Replace with the actual URL

  return (
    <div>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={1} />
      </Document>
      <p>Number of pages: {numPages}</p>
    </div>
  );
};

export default ViewPDf;