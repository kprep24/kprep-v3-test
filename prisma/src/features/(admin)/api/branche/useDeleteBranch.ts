import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBranche = () => {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: async ({ id }: {
            id: string
        }) => {

            return await axiosInstance.get(`/api/branch/delete-branche/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["branches"] });
        },
        onError: (error) => {
            console.log("THE QUERY ERROR", error)
            console.error("Error adding admin:", error);
        },
        onSettled: () => {
            // queryClient.invalidateQueries({ queryKey: ["invitations"] });
        },
    });

    return query;
};
