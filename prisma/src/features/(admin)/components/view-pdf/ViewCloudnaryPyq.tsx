"use client";
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { degrees, PDFDocument, rgb } from "pdf-lib";
import getPdf from "@/features/(main)/api/getPdf";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import getPyqUrl from "@/features/(main)/api/getPyqUrl";
function ViewCloudnaryPyq({ pdfFileUrl, isLoading, error, isError }: {
    pdfFileUrl: any,
    isLoading: boolean,
    error: any,
    isError: boolean
}) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [scale, setScale] = useState(1.2);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [originalPdfUrl, setOriginalPdfUrl] = useState("");

    // const param = useSearchParams();
    // const id = param.get("id") || "";
    // const { data } = useSession();

    // ✅ Fetch PDF File URL

    //test
    // console.log(pdfFileUrl)
    useEffect(() => {
        if (pdfFileUrl?.pyqUrl) {
            const fullUrl = `https://res.cloudinary.com/dgw0nurwl/image/upload/v1739602354/${pdfFileUrl.pyqUrl}.pdf`;
            setOriginalPdfUrl(fullUrl);
        }
    }, [pdfFileUrl]);
    //this is test
    useEffect(() => {
        const addWatermarkToPdf = async () => {
            if (!originalPdfUrl) return;
            try {
                const existingPdfBytes = await fetch(originalPdfUrl).then((res) => res.arrayBuffer());
                const pdfDoc = await PDFDocument.load(existingPdfBytes);
                const pages = pdfDoc.getPages();

                pages.forEach((page) => {
                    const { width, height } = page.getSize();
                    page.drawText("K-Prep", {
                        x: width / 4,
                        y: height / 4,
                        size: 140,
                        color: rgb(0.5, 0.5, 0.5),
                        opacity: 0.3,
                        rotate: degrees(45),
                    });
                });

                const modifiedPdfBytes = await pdfDoc.save();
                const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
                const modifiedPdfUrl = URL.createObjectURL(modifiedPdfBlob);
                setPdfUrl(modifiedPdfUrl);
            } catch (error) {
                console.error("Error adding watermark:", error);
            }
        };

        addWatermarkToPdf();
    }, [originalPdfUrl]); // ✅ Runs when `originalPdfUrl` updates
    if (isError) {
        return (
            <div className="flex items-center justify-center h-screen text-red-500">
                Error: {"You are not allowed to access the pdf"}
            </div>
        );
    }
    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen relative">
            <div className="w-auto bg-white shadow-lg rounded-lg overflow-auto p-4 border">
                {pdfUrl ? (
                    <Document file={pdfUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                        {numPages &&
                            Array.from({ length: numPages }, (_, index) => (
                                <Page key={index} pageNumber={index + 1} scale={scale} />
                            ))}
                    </Document>
                ) : (
                    <p>loading PDF</p>
                )}
            </div>
        </div>
    );
}

export default ViewCloudnaryPyq
