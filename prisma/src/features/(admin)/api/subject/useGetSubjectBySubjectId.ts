import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";


function useGetSubjectBySubjectId(subjectId: string | null) {
    const query = useQuery({
        enabled: !!subjectId,
        queryKey: ["subject", subjectId],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/subject/${subjectId}`);
            // console.log(data)
            return res.subject;
        },
    });
    return query;
}

export default useGetSubjectBySubjectId
