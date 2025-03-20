import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useApprovedfeedback = () => {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: async (id: string) => {
            const res = await axiosInstance.put(`/api/feedback/approved/${id}`);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
        },
        onError: (error) => {
            console.error("Error adding admin:", error);
        }
    });

    return query;
}