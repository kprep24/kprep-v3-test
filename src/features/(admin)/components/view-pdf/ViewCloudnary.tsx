
"use client"
// import React, { useEffect } from 'react'
import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { degrees, PDFDocument, rgb } from "pdf-lib";
function ViewCloudnary({ pdfFileUrl, error, isLoading, isError }: { pdfFileUrl: string, error: any, isLoading: boolean, isError: any }) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [scale, setScale] = useState(1.2);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [originalPdfUrl, setOriginalPdfUrl] = useState("");
    useEffect(() => {
        if (pdfFileUrl) {
            let fullUrl = "";
            if (pdfFileUrl.startsWith("google_drive_")) {
                const googleDriveId = pdfFileUrl.replace("google_drive_", "");
                fullUrl = `https://drive.google.com/uc?export=download&id=${googleDriveId}`;
            } else {
                fullUrl = `https://res.cloudinary.com/dgw0nurwl/image/upload/v1739602354/${pdfFileUrl}.pdf`;
            }
            setOriginalPdfUrl(fullUrl);
            console.log("originalPdfUrl:", fullUrl);
        }
    }, [pdfFileUrl]);

    useEffect(() => {
        const loadPdfWithWatermark = async () => {
            if (!originalPdfUrl) return;

            if (originalPdfUrl.startsWith("https://drive.google.com/uc?export=download&id=")) {
                // If it's a direct Google Drive download URL, use an iframe
                setPdfUrl(null); // Clear react-pdf url
                return;
            }

            try {
                const response = await fetch(originalPdfUrl);
                if (!response.ok) {
                    console.error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
                    return;
                }

                const existingPdfBytes = await response.arrayBuffer();
                const pdfDoc = await PDFDocument.load(existingPdfBytes);
                const pages = pdfDoc.getPages();

                pages.forEach((page, index) => {
                    const { width, height } = page.getSize();
                    page.drawText("K-Prep", {
                        x: width / 4,
                        y: height / 4,
                        size: 140,
                        color: rgb(0.5, 0.5, 0.5),
                        opacity: 0.3,
                        rotate: degrees(45),
                    });

                    page.drawText(`Page ${index + 1} of ${pages.length}`, {
                        x: width / 2 - 50,
                        y: 30,
                        size: 12,
                        color: rgb(0.5, 0.5, 0.5),
                    });
                });

                const modifiedPdfBytes = await pdfDoc.save();
                const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
                const modifiedPdfUrl = URL.createObjectURL(modifiedPdfBlob);
                setPdfUrl(modifiedPdfUrl);
            } catch (error) {
                console.error("Error processing PDF:", error);
            }
        };

        loadPdfWithWatermark();
    }, [originalPdfUrl]);

    if (isError) {
        return (
            <div className="flex items-center justify-center h-screen text-red-500 text-center p-4">
                Error: {"You are not allowed to access the PDF"}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-screen md:p-4">
            <div className="w-auto shadow-lg rounded-lg overflow-auto p-4 border">
                {  pdfUrl && (
                    <div className="overflow-x-auto">
                        <Document className={"p-0"} file={pdfUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                            {numPages &&
                                Array.from({ length: numPages }, (_, index) => (
                                    <div key={index} className="relative text-center mt-6 ">
                                        <Page pageNumber={index + 1} className="mx-auto my-4" />
                                    </div>
                                ))}
                        </Document>
                    </div>
                )
                }
            </div>
        </div>
    );
}

export default ViewCloudnary
