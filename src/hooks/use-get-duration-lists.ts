import useGetCourses from "@/features/(admin)/api/course_brnach/useGetCourse";
import useGetCourseById from "@/features/(admin)/api/course_brnach/useGetCourseById";
import { IcourseList } from "@/features/(admin)/components/course_branch/branch/AddBranch";
import { getDurationList } from "@/helpers/resources/getDurationList";



export const useGetDurationList = (courseId?: string) => {
    const course = useGetCourses();
    const courseList: IcourseList[] = course.data && course.data.map((item: any) => ({ value: item.id, title: item.name }));
    const courseDetails = useGetCourseById(courseId);
    const courseDuration = courseDetails && courseDetails.data?.duration;
    const durationList = getDurationList(courseDuration);
    return { durationList, courseList }
}