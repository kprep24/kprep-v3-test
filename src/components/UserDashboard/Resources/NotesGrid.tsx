"use client"

import getResourcesList from "@/features/(main)/api/getResources";
import FreePdf from "../FreePdf";
import PremiumPdf from "../PremiumPdf";
import { Note } from "./notes";
import { useSession } from "next-auth/react";
import { IsubjectData } from "@/features/(admin)/components/subjects/SubjectTableBodyBox";
import PDFCardSkeleton from "@/components/PDFLoading/PdfCardSkelton";

interface NotesGridProps {
  notes: IresourcesList[];
  showHeadings: boolean;
  loading: boolean;
}


export interface IresourcesList {
  id: string
  description: string;
  freemium: string;
  contentType: "Slide" | "Handwritten"
  subjectId: string;
  title: string;
  subject: {
    fullName: string;
  }
}

export default function NotesGrid({ notes, showHeadings, loading }: NotesGridProps) {
  // const teacherNotes = notes.filter(note => note.category === "Regular PPT");
  // const topperNotes = notes.filter(note => note.category === "Topper Notes");
  const { data } = useSession();

  // console.log("The notes are", notes);

  const resources = getResourcesList(data?.user.id!);
  const resourcesList: IresourcesList[] = resources.data || [];
  const freeResourcesList: IresourcesList[] = notes.filter(
    resource => resource.freemium === "Free"
  );
  const premimumResourcesList: IresourcesList[] = notes.filter(
    resource => resource.freemium === "Premium"
  );
  // console.log("PREE", premimumResourcesList)
  if (loading) {
    return <div className="flex gap-2 flex-wrap">
      {Array.from({ length: 6 }).map((_,i) => <PDFCardSkeleton key={i} />)}
    </div>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2lg:grid-cols-5 gap-4">
      {freeResourcesList.length > 0 || premimumResourcesList.length > 0 ? (
        <>
          {freeResourcesList && freeResourcesList.length > 0 && (
            <div className="col-span-1 xl:col-span-4 lg:col-span-3 sm:col-span-2 2lg:col-span-5">
              <h2 className="text-2xl font-bold mb-2">Teacher notes</h2>
            </div>
          )}
          {freeResourcesList.map((note) => (
            <FreePdf link={`/userboard/viewPdf?id=${note.id}`} key={note.id} title={note.title} subtitle={note.description} />
          ))}
          {showHeadings && premimumResourcesList.length > 0 && (
            <div className="col-span-1 xl:col-span-4 lg:col-span-3 sm:col-span-2 2lg:col-span-5">
              <h2 className="text-2xl font-bold mb-2">Topper notes</h2>
            </div>
          )}
          {premimumResourcesList.map((note) => (
            <PremiumPdf
              // solutionUrl={note.}
              link={`/userboard/viewPdf?id=${note.id}`}

              key={note.id} title={note.title}
              subtitle={note.description} />
          ))}
        </>
      ) : (
        <p className="text-center col-span-4">No notes found.
        </p>
      )}
    </div>
  );
}
