import { IPyqList } from "@/app/(main)/userboard/userpyqs/page";
// import FreePdf from "../FreePdf";
import PremiumPdf from "../PremiumPdf";
import PDFCardSkeleton from "@/components/PDFLoading/PdfCardSkelton";
// import { Note } from "./pyqs";
// import getPyqUrl from "@/features/(main)/api/getPyqUrl";

interface PyqsGridProps {
  notes: IPyqList[];
  showHeadings: boolean;
  loading: boolean; // Add loading state here to show a loading spinner while data is fetched.
}

export default function PyqsGrid({ notes, showHeadings, loading }: PyqsGridProps) {
  // const midsemNotes = notes.filter(note => note.category === "Midsem PYQs");
  // const endsemNotes = notes.filter(note => note.category === "Endsem PYQs");
  // const pyqList = notes.filter(()
  // const pyq= = getPyqUrl();
  if (loading) {
    return <div className="flex gap-2">
     {Array.from({ length: 6 }).map((_,i) => <PDFCardSkeleton key={i} />)}
    </div>
  }
  // console.log(notes)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2lg:grid-cols-5 gap-4">
      {notes.length > 0 ? (
        <>
          {showHeadings && notes.length > 0 && (
            <div className="col-span-1 xl:col-span-4 lg:col-span-3 sm:col-span-2 2lg:col-span-5">
              <h2 className="text-2xl font-bold mb-2">Midsem PYQs</h2>
            </div>
          )}
          {/* {midsemNotes.map((note) => (
            <FreePdf link={`/userboard/viewPdf?pdfUrl=${note.pdfUrl}`} key={note.id} title={note.title} subtitle={note.subject} />
          ))} */}
          {/* {showHeadings && endsemNotes.length > 0 && (
            <div className="col-span-2 md:col-span-5">
              <h2 className="text-2xl font-bold mb-2">Endsem PYQs</h2>
            </div>
          )} */}
          {notes.map((note) => (
            <PremiumPdf
              isSolutionAvaliable={note.solutionUrl === "" ? false : true}
              type={'pyq'}
              link={`/userboard/viewPyq?id=${note.id}`}
              solUrl={`/userboard/view-sol?id=${note.id}`}
              key={note.id}
              title={note.title}
              subtitle={""}
            />
          ))}
        </>
      ) : (
        <p className="text-center col-span-4">No notes found.</p>
      )}
    </div>
  );
}
