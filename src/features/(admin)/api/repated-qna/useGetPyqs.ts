import axiosInstance from "@/lib/axiosInstance"
import { Admin } from "@prisma/client";
import { useQuery } from "@tanstack/react-query"



function useGetQna() {
    const query = useQuery({
        queryKey: ["rpyq"],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/repated`);
            // console.log(data)
            return res.repeatedQuestions;
        },
    });
    return query;
}

export default useGetQna
