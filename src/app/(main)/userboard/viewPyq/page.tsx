"use server"

// import ViewPDf from "@/app/(admin)/view-pdf/page";
// import TestPDFViewer from "@/features/(admin)/components/view-pdf/ViewPdf";
import ViewPyq from "@/features/(admin)/components/view-pdf/ViewPyq";
import SecurityLayer from "@/provider/DisableContext";
// import ViewPdf from "../../../../components/UserDashboard/ViewPdf";
import { db } from "@/lib/db";
// interface Params {
//   slug: string;
// }

// export async function generateMetadata({ params }: { params: Params }) {
//   const { slug } = params;
//   console.log(slug)



//   return {
//     title: "Test metadata",
//   };
// }


const ViewPdfPage = () => {
  return (
    <ViewPyq />
  );
};

export default ViewPdfPage;
