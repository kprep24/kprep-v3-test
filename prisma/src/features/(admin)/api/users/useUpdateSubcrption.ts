import axiosInstance from "@/lib/axiosInstance";
import { Role } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod"
export const useUpdateSubcrption = () => {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: async ({ id }: {
            id: string
        }) => {

            return await axiosInstance.get(`/api/users/make-premium/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
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
