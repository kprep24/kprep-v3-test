"use client";

import { useState } from "react";
import CheatFilters from "@/components/UserDashboard/cheat-sheet/CheatFilters";
import CheatGrid, { ISheet } from "@/components/UserDashboard/cheat-sheet/CheatGrid";
import { useSession } from "next-auth/react";
import useGetUserFormula from "@/features/(admin)/api/formula_sheet/get-user-formula";
import { useUserInfo } from "@/store/AuthStore";

// Define the interface for cheat sheets
interface ICheatSheet {
  id: string;
  title: string;
  subjectId: string;
}

export default function CheatSheetPage() {


  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const loading = false; // Static loading state
  const { data } = useSession();
  const { year } = useUserInfo();
  const sheets = useGetUserFormula(data?.user.id!, year);
  const sheetList: ISheet[] = sheets.data || [];
  // Filter cheat sheets based on user selection
  const filteredCheatSheets = selectedSubject
    ? sheetList.filter(sheet => sheet.subjectId === selectedSubject)
    : sheetList;

  const showHeadings = !selectedSubject;
  console.log(selectedSubject)
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Cheat Sheets</h1>

      {/* Filters */}
      <CheatFilters
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
      />

      {/* Cheat Sheets Grid */}
      <CheatGrid
        cheatSheets={filteredCheatSheets}
        loading={sheets.isLoading}
        showHeadings={showHeadings}
      />
    </div>
  );
}
