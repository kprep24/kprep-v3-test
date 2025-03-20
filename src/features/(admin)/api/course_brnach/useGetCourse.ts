import axiosInstance from "@/lib/axiosInstance"
import { Admin } from "@prisma/client";
import { useQuery } from "@tanstack/react-query"



function useGetCourses() {
    const query = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/course/get-courses`);
            // console.log(data)
            return res.courses;
        },
    });
    return query;
}

export default useGetCourses
