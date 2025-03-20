export interface Note {
  id: number;
  title: string;
  subject: string;
  category: "Midsem PYQs" | "Endsem PYQs";
  pdfUrl: string;
}

export const notesData: Note[] = [
  { id: 1, title: "Math midsem | 2021", subject: "Mathematics", category: "Midsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 2, title: "Math endsem | 2021", subject: "Mathematics", category: "Endsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 3, title: "Physics midsem | 2021", subject: "Physics", category: "Midsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 4, title: "Physics endsem | 2021", subject: "Physics", category: "Endsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 5, title: "CS midsem | 2021", subject: "CS", category: "Midsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 6, title: "CS endsem | 2021", subject: "CS", category: "Endsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 7, title: "English midsem | 2021", subject: "English", category: "Midsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 8, title: "English endsem | 2021", subject: "English", category: "Endsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 9, title: "Biology midsem | 2021", subject: "Biology", category: "Midsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 10, title: "Biology endsem | 2021", subject: "Biology", category: "Endsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 11, title: "Chemistry midsem | 2021", subject: "Chemistry", category: "Midsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 12, title: "Chemistry endsem | 2021", subject: "Chemistry", category: "Endsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 13, title: "Math midsem | 2022", subject: "Mathematics", category: "Midsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 14, title: "Math endsem | 2022", subject: "Mathematics", category: "Endsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 15, title: "Physics midsem | 2022", subject: "Physics", category: "Midsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 16, title: "Physics endsem | 2022", subject: "Physics", category: "Endsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 17, title: "CS midsem | 2022", subject: "CS", category: "Midsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 18, title: "CS endsem | 2022", subject: "CS", category: "Endsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 19, title: "English midsem | 2022", subject: "English", category: "Midsem PYQs", pdfUrl: "/sample.pdf" },
  { id: 20, title: "English endsem | 2022", subject: "English", category: "Endsem PYQs", pdfUrl: "/sample.pdf" },
];
