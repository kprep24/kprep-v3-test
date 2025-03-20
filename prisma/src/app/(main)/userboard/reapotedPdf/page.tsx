"use client"

// import ViewPDf from "@/app/(admin)/view-pdf/page";
// import TestPDFViewer from "@/features/(admin)/components/view-pdf/ViewPdf";
import { subjectsList } from "@/components/UserDashboard/MostRepeatedPYQs";
import ViewPyq from "@/features/(admin)/components/view-pdf/ViewPyq";
import ViewR from "@/features/(admin)/components/view-pdf/ViewR";
import getReaptedQnaURL from "@/features/(main)/api/getReaptedQnaURL";
import SecurityLayer from "@/provider/DisableContext";
import { useUserInfo } from "@/store/AuthStore";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
// import ViewPdf from "../../../../components/UserDashboard/ViewPdf";

const ViewPdfPage = () => {

  // const { }ya = useUserInfo();
  // const filterSubjectList = subjectsList.filter((subject) => subject.year == year);
  // const url = subjectsList[0]?.url;
  // console.log(url)
  const param = useSearchParams();
  const id = param.get("id") || "";
  const { data } = useSession();
  const repatedQuestions = getReaptedQnaURL(data?.user.id!, id);
  if (repatedQuestions.isLoading) {
    return <p>Loagin</p>
  }
  if (repatedQuestions.isError) {

  }
  console.log(repatedQuestions?.data?.pyqUrl)
  return (
    // <SecurityLayer>
    <ViewR pdfUrl={repatedQuestions.data.pyqUrl} />
    // </SecurityLayer>
  );
};

export default ViewPdfPage;
