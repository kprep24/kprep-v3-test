import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";



export function useGetSubjectByCourseId(courseId: string | null) {
    const query = useQuery({
        enabled: !!courseId,
        queryKey: ["subject", courseId],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/subject/subject/${courseId}`);
            // console.log(data)
            return res.subjects;
        },
    });
    return query;
}