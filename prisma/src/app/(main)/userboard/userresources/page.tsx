"use client";

import { useState } from "react";
import Filters from "@/components/UserDashboard/Resources/ResourcesFilters";
import NotesGrid, { IresourcesList } from "@/components/UserDashboard/Resources/NotesGrid";
import { notesData } from "@/components/UserDashboard/Resources/notes";
import getResourcesList from "@/features/(main)/api/getResources";
import { useSession } from "next-auth/react";

export default function NotesPage() {
  const { data } = useSession();

  const resources = getResourcesList(data?.user.id!);
  const resourcesList: IresourcesList[] = resources.data || [];
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const loading = resources.isLoading;
  // Filter notes based on user selection

  const filteredNotes = resourcesList.filter((note) => {
    // console.log(selectedCategory);
  
    if (selectedCategory === "Topper Notes") {
      return note.contentType === "Handwritten" && (!selectedSubject || note.subjectId === selectedSubject);
    }
  
    if (selectedCategory === "Regular PPT") {
      return note.contentType === "Slide" && (!selectedSubject || note.subjectId === selectedSubject);
    }
  
    return !selectedSubject || note.subjectId === selectedSubject;
  });
  
  const showHeadings = !selectedSubject && !selectedCategory;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Resources</h1>

      {/* Filters */}
      <Filters
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Notes Grid */}
      <NotesGrid loading={loading} notes={filteredNotes} showHeadings={showHeadings} />
    </div>
  );
}
