export interface Note {
  id: number;
  title: string;
  subject: string;
  category: "Regular PPT" | "Topper Notes";
  pdfUrl: string;
}

export const notesData: Note[] = [
  { id: 1, title: "Math PPT 1", subject: "Mathematics", category: "Regular PPT", pdfUrl: "/sample.pdf" },
  { id: 2, title: "Math Topper 1", subject: "Mathematics", category: "Topper Notes", pdfUrl: "/sample.pdf" },
  { id: 3, title: "Physics PPT 1", subject: "Physics", category: "Regular PPT", pdfUrl: "/sample.pdf" },
  { id: 4, title: "Physics Topper 1", subject: "Physics", category: "Topper Notes", pdfUrl: "/sample.pdf" },
  { id: 5, title: "CS PPT 1", subject: "CS", category: "Regular PPT", pdfUrl: "/sample.pdf" },
  { id: 6, title: "CS Topper 1", subject: "CS", category: "Topper Notes", pdfUrl: "/sample.pdf" },
  { id: 7, title: "English PPT 1", subject: "English", category: "Regular PPT", pdfUrl: "/sample.pdf" },
  { id: 8, title: "English Topper 1", subject: "English", category: "Topper Notes", pdfUrl: "/sample.pdf" },
  { id: 9, title: "Biology PPT 1", subject: "Biology", category: "Regular PPT", pdfUrl: "/sample.pdf" },
  { id: 10, title: "Biology Topper 1", subject: "Biology", category: "Topper Notes", pdfUrl: "/sample.pdf" },
  { id: 11, title: "Chemistry PPT 1", subject: "Chemistry", category: "Regular PPT", pdfUrl: "/sample.pdf" },
  { id: 12, title: "Chemistry Topper 1", subject: "Chemistry", category: "Topper Notes", pdfUrl: "/sample.pdf" },
  { id: 13, title: "Math PPT 2", subject: "Mathematics", category: "Regular PPT", pdfUrl: "/sample.pdf" },
  { id: 14, title: "Math Topper 2", subject: "Mathematics", category: "Topper Notes", pdfUrl: "/sample.pdf" },
  { id: 15, title: "Physics PPT 2", subject: "Physics", category: "Regular PPT", pdfUrl: "/sample.pdf" },
  { id: 16, title: "Physics Topper 2", subject: "Physics", category: "Topper Notes", pdfUrl: "/sample.pdf" },
  { id: 17, title: "CS PPT 2", subject: "CS", category: "Regular PPT", pdfUrl: "/sample.pdf" },
  { id: 18, title: "CS Topper 2", subject: "CS", category: "Topper Notes", pdfUrl: "/sample.pdf" },
  { id: 19, title: "English PPT 2", subject: "English", category: "Regular PPT", pdfUrl: "/sample.pdf" },
  { id: 20, title: "English Topper 2", subject: "English", category: "Topper Notes", pdfUrl: "/sample.pdf" },
];
