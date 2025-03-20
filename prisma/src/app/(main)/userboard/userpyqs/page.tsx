"use client";

import { useState } from "react";
import PyqsFilters from "@/components/UserDashboard/pyqs/PyqsFilters";
import PyqsGrid from "@/components/UserDashboard/pyqs/PyqsGrid";
import { notesData } from "@/components/UserDashboard/pyqs/pyqs";
import { useSession } from "next-auth/react";
import getPyqsList from "@/features/(main)/api/getPyqs";


export interface IPyqList {
  subject: {
    fullName: string;
  },
  title: string;
  subjectId: string;
  id: string;
  pyqType: string;
  solutionUrl: string;
}

export default function NotesPage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data } = useSession();
  const pyq = getPyqsList(data?.user.id!);
  const PyqList: IPyqList[] = pyq.data || [];
  // console.log(pyq.data)
  // Filter notes based on user selection
  const filteredNotes: IPyqList[] = PyqList.filter((note) => {
    return (
      (!selectedSubject || note.subjectId === selectedSubject)
    );
  });

  const showHeadings = !selectedSubject && !selectedCategory;
  const loading = pyq.isLoading;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">PYQs</h1>

      {/* Filters */}
      <PyqsFilters
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Notes Grid */}
      <PyqsGrid loading={loading} notes={filteredNotes} showHeadings={showHeadings} />
    </div>
  );
}
