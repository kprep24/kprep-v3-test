"use client"

import useAuthStore, { useUserInfo } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// const ViewR = ({ pdfUrl }: { pdfUrl: string }) => {


//   console.log(pdfUrl)

//   return (
//     <div className="w-full h-screen">
//       <iframe
//         src={"https://res.cloudinary.com/dgw0nurwl/image/upload/v1740347098/CC_NOTES_MID25_wonap3.pdf"}
//         className="w-full h-full"
//         frameBorder="0"
//       ></iframe>
//     </div>
//   );
// };

// export default ViewR;


const ViewR = ({ pdfUrl }: { pdfUrl: string }) => {

  const { userType } = useUserInfo();
  const router = useRouter();

  useEffect(() => {
    if (userType !== "Premium") {
      router.replace("/pricing"); // `replace` prevents going back to this page using browser back button
    }
  }, [userType, router]);

  return (
    <div className="w-full h-screen">
      <iframe
        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
        className="w-full h-full"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default ViewR;
