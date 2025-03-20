// import ViewPDf from "@/app/(admin)/view-pdf/page";
import TestPDFViewer from "@/features/(admin)/components/view-pdf/ViewPdf";
import SecurityLayer from "@/provider/DisableContext";
// import ViewPdf from "../../../../components/UserDashboard/ViewPdf";

const ViewPdfPage = () => {
  return  <SecurityLayer><TestPDFViewer /></SecurityLayer> 

};

export default ViewPdfPage;
