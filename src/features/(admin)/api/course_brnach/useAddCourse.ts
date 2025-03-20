import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddCourse = () => {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: async ({ name, duration, type }: {
            name: string, duration: string, type: string
        }) => {

            return await axiosInstance.post(`/api/course/add-course`, {
                name, duration, type
            });
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
