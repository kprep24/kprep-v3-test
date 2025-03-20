import axiosInstance from "@/lib/axiosInstance";
import { Role } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditCourse = () => {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: async ({ name, duration, type, id }: {
            name: string, duration: string, type: string, id: string
        }) => {

            return await axiosInstance.post(`/api/course/update-course/${id}`, {
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
