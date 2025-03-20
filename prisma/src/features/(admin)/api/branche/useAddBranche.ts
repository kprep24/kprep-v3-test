import axiosInstance from "@/lib/axiosInstance";
import { Role } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddBranche = () => {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: async ({ name, shortName, courseId }: {
            name: string, shortName: string, courseId: string
        }) => {

            return await axiosInstance.post(`/api/branch/add-branch`, {
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
