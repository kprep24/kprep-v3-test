"use client";
import { useUserInfo } from "@/store/AuthStore";
import React from "react";
import { FaLock } from "react-icons/fa";
interface PremiumPdfProps {
  title: string;
  subtitle: string;
  link: string;
  type?: string;
  solutionUrl?: string;
  solUrl?: string;
  isSolutionAvaliable?: boolean
}

const PremiumPdf: React.FC<PremiumPdfProps> = ({ title, subtitle, link, type, solutionUrl,solUrl,isSolutionAvaliable }) => {

  const { userType } = useUserInfo();
  // console.log(userType)
  const url = userType === "Premium" ? link : "https://www.kprep.in/pricing";

  return (
    <>
      {type && type === "pyq" ?
        <div className={`flex flex-col items-center w-56 border-2 border-[#74AA63] dark:border-[#5D8CAB] hover:scale-105 transform duration-300 rounded-lg shadow-md relative ${userType === "Free" && "cursor-not-allowed"}`}>
          <div className="icon absolute text-yellow-400">
            {userType !== "Premium" && <FaLock className="w-5 h-5 right-6 top-5" />}
          </div>
          <img src="/premiumpdf.png" alt={title} className="w-56 h-48 dark:hidden block object-contain m-2 " />
          <img src="https://res.cloudinary.com/da3u4ukxz/image/upload/v1740084755/36_1_leb2ei.png" alt={title} className="w-56 h-48 hidden dark:block object-contain m-2 " />
          <div className="text-center mt-2 border-t-2 border-[#74AA63] dark:border-[#5D8CAB]  p-2 w-56">
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">{subtitle}</p>
          </div>
        <div className="flex flex-row items-center gap-2">
        <a target="_blank" href={url}>
            <button className="px-2 py-1 bg-green-300 my-1 text-sm rounded-md disabled:bg-green-100">View PYQ</button>
          </a>
          <a target="_blank" href={solUrl}>
            <button disabled={!isSolutionAvaliable} className="px-2 py-1 bg-green-300 my-1 text-sm rounded-md disabled:bg-green-100">View Solutions</button>
          </a>
        </div>
        </div>
        : <a className={`${userType === "Free" && "cursor-not-allowed"}`} target="_blank" href={url}>
          <div className={`flex flex-col items-center w-56 border-2 border-[#74AA63] dark:border-[#5D8CAB] cursor-pointer hover:scale-105 transform duration-300   rounded-lg shadow-md relative ${userType === "Free" && "cursor-not-allowed"}`}>
            <div className="icon absolute text-yellow-400">
              {userType !== "Premium" && <FaLock className="w-5 h-5 right-6 top-5" />}
            </div>
            <img src="/premiumpdf.png" alt={title}
              className={`w-56 h-48 dark:hidden block object-contain m-2  `}
            />
            <img src="https://res.cloudinary.com/da3u4ukxz/image/upload/v1740084755/36_1_leb2ei.png" alt={title}
              className={`w-56 h-48 hidden dark:block object-contain m-2 transition-transform duration-300`}
            />
            <div className="text-center mt-2 border-t-2 border-[#74AA63] dark:border-[#5D8CAB] p-2 w-56">
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="text-[11px] text-gray-600 dark:text-gray-300 h-[30px] overflow-hidden text-ellipsis">{subtitle}</p>
            </div>

          </div>
        </a>}
    </>

  );
};

export default PremiumPdf;
