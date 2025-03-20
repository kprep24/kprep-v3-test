import { useGetSubjectByCourseId } from "@/features/(admin)/api/subject/useGetSubjectByCourseId";
import { IcourseList } from "@/features/(admin)/components/course_branch/branch/AddBranch"; // Assuming ISubject is the correct type

export const useGetSubjects = (courseId: string, year: string): IcourseList[] => {
    const subjects = useGetSubjectByCourseId(courseId);

    if (!subjects.data) {
        return [];
    }

    const subjectList: IcourseList[] = subjects.data.map((item: any) => {
        return { value: item.id, title: item.fullName, year: item.year };
    });

    const extractSubjectList: IcourseList[] = subjectList.filter((item) => item.year === year);

    return extractSubjectList;
};