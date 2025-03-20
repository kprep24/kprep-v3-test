import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";




function useDeleteFeedbacks() {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: async (id: string) => {
            const res = await axiosInstance.delete(`/api/feedback/${id}`);
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

export default useDeleteFeedbacks;
