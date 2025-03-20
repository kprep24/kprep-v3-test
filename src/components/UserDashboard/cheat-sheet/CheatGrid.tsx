"use client";

import useGetUserFormula from "@/features/(admin)/api/formula_sheet/get-user-formula";
import CheatPdf from "../CheatPdf";
import { useSession } from "next-auth/react";

// Interface for cheat sheets
interface CheatSheet {
  id: string;
  title: string;
  subjectId: string;
}



export interface ISheet {
  subject: { fullName: string };
  title: string;
  id: string;
  subjectId: string;
}
interface CheatGridProps {
  cheatSheets: ISheet[];
  loading: boolean;
  showHeadings?: boolean;
}

export default function CheatGrid({ cheatSheets, loading = false, showHeadings = true }: CheatGridProps) {

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2lg:grid-cols-5 gap-4">
        <p className="text-center col-span-full">Loading cheat sheets...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2lg:grid-cols-5 gap-4">
      {cheatSheets.length > 0 ? (
        <>
          {showHeadings && (
            <div className="col-span-1 xl:col-span-4 lg:col-span-3 sm:col-span-2 2lg:col-span-5">
            </div>
          )}
          {cheatSheets.map((sheet) => (
            <CheatPdf
              key={sheet.id}
              title={sheet.title}
              subtitle={sheet.title}
              link={`/userboard/viewCheatSheet?id=${sheet.id}`}
            />
          ))}
        </>
      ) : (
        <p className="text-center col-span-full">No cheat sheets available for the selected filters.</p>
      )}
    </div>
  );
}
