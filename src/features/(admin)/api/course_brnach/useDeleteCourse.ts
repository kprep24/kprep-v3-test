import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCourse = () => {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: async ({ id }: {
            id: string
        }) => {

            return await axiosInstance.get(`/api/course/delete-course/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["courses"] });
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
