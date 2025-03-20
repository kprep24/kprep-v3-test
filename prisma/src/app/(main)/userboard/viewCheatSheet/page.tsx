// import ViewPDf from "@/app/(admin)/view-pdf/page";
import ViewSheet from "@/features/(admin)/components/view-pdf/View-Sheet";
import ViewSoltions from "@/features/(admin)/components/view-pdf/View-Soltions";
import TestPDFViewer from "@/features/(admin)/components/view-pdf/ViewPdf";
import SecurityLayer from "@/provider/DisableContext";
// import ViewPdf from "../../../../components/UserDashboard/ViewPdf";

const ViewSolPage = () => {
    return <SecurityLayer><ViewSheet /></SecurityLayer>  

};

export default ViewSolPage;
