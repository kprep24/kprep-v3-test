import axiosInstance from "@/lib/axiosInstance";
import { Role } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditBranche = () => {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: async ({ name, shortName, courseId, id }: {
            name: string, courseId: string, shortName: string, id: string
        }) => {

            return await axiosInstance.post(`/api/branch/update-branch/${id}`, {
                name,
                shortName,
                courseId
            });
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
