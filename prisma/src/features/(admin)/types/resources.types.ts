interface ResourceDetails {
    id: string;
    resourcesId: string;
    year: string;
    courseId: string;
}

interface Subject {
    fullName: string;
    shortName: string;
}

interface IResource {
    ResourcesDetails: ResourceDetails;
    addedById: string;
    contentType: "Handwritten" | "Slide";
    createdAt: string; 
    description: string;
    encrypted: boolean;
    fileName: string;
    fileUrl: string;
    freemium: "Premium" | "Free"; 
    id: string;
    isGoogleDrive: boolean;
    subject: Subject;
    subjectId: string;
    title: string;
    updatedAt: string; 
    visibility: "Private" | "Public";
}

export type { IResource, ResourceDetails, Subject };