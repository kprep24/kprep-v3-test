import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";


export const useGetFeedbacks = () => {
    const query = useQuery({
        queryKey: ["feedbacks"],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/feedback`);
            return res.feedbacks;
        },
    });
    return query;
}