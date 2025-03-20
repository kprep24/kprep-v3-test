import axiosInstance from "@/lib/axiosInstance"
import { Admin } from "@prisma/client";
import { useQuery } from "@tanstack/react-query"



function useGetCourseById(id: string | undefined) {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["courses", id],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/course/get-course/${id}`);
            // console.log(data)
            return res.course;
        },
    });
    return query;
}

export default useGetCourseById
