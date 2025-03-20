interface Subject {
    shortName: string;
}

interface IPyq {
    courseId: string;
    createdAt: string;
    freemium: 'Free' | 'Premium';
    id: string;
    isGoogleDrive: boolean;
    pyqType: 'Mid' | 'End' | 'Supplement' | 'Improvement';
    pyqUrl: string;
    semType: 'Spring' | 'Autumn';
    solutionUrl: string;
    subject: Subject;
    subjectId: string;
    title: string;
    updatedAt: string;
    visibility: "Public" | "Private";
    year: "Two";
}

export type { IPyq, Subject };