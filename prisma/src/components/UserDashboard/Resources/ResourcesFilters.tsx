"use client"

import getSubjectsList from "@/features/(main)/api/getSubjects";
import { useSession } from "next-auth/react";

interface FiltersProps {
  selectedSubject: string | null;
  setSelectedSubject: (subject: string | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}


const categories = ["Regular PPT", "Topper Notes"];


export interface IsubjectData {
  fullName: string;
  id: string;
}

export default function Filters({
  selectedSubject,
  setSelectedSubject,
  selectedCategory,
  setSelectedCategory,
}: FiltersProps) {


  const { data } = useSession();
  const subjectsList = getSubjectsList(data?.user.id!);

  const subjectData: IsubjectData[] = subjectsList.data || [];
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Subject Dropdown */}
      <select
        title="subject"
        value={selectedSubject || ""}
        onChange={(e) => setSelectedSubject(e.target.value || null)}
        className="bg-white dark:bg-gray-900 backdrop-blur-md text-black dark:text-white px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 shadow-lg transition ease-in-out duration-300"
      >
        <option value="">All Subjects</option>
        {subjectData && subjectData.map((subject: any) => (
          <option key={subject.id} value={subject.id} className="hover:bg-black dark:hover:bg-white">
            {subject.fullName}
          </option>
        ))}
      </select>

      {/* Notes Type Dropdown */}
      <select
        title="category"
        value={selectedCategory || ""}
        onChange={(e) => setSelectedCategory(e.target.value || null)}
        className="bg-white dark:bg-gray-900 backdrop-blur-md text-black dark:text-white px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 shadow-lg transition ease-in-out duration-300"
      >
        <option value="">All Notes</option>
        {categories.map((category) => (
          <option key={category} value={category} className="hover:bg-black dark:hover:bg-white">
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
