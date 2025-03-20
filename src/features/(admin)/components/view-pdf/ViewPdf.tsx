"use client";
import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { degrees, PDFDocument, rgb } from "pdf-lib";
import getPdf from "@/features/(main)/api/getPdf";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import ViewCloudnary from "./ViewCloudnary";
import PDFSkeletonLoader from "@/components/PDFLoading/PDFSkeletonLoader";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const useScreenWidth = () => {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const TestPDFViewer = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1.2);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [originalPdfUrl, setOriginalPdfUrl] = useState("");
  const screenWidth = useScreenWidth();
  const param = useSearchParams();
  const id = param.get("id") || "";
  const { data } = useSession();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { data: pdfFileUrl, isLoading, error, isError } = getPdf(data?.user?.id || "", id);
  console.log("pdfFileUrl:", pdfFileUrl);

  if (isLoading)
    return <PDFSkeletonLoader />


  return <>
    {pdfFileUrl && pdfFileUrl.startsWith("https://drive.google.com") ? <iframe src={pdfFileUrl} width="100%" height="600px">
    </iframe> : <ViewCloudnary
      pdfFileUrl={pdfFileUrl}
      error={error}
      isLoading={isLoading}
      isError={isError}
    />}
  </>
};

export default TestPDFViewer;