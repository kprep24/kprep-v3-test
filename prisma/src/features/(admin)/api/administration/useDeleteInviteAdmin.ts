import axiosInstance from "@/lib/axiosInstance";
import { Role } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteInviteAdmin = () => {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: async ({ id }: {
          id:string

        }) => {

            const res = await axiosInstance.get(`/api/admin/protected/delete-admin/${id}`);
            return res; // Return parsed response data

        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["invitations"] });
        },
        onError: (error) => {
            console.error("Error adding admin:", error);
        },
        onSettled: () => {
            // queryClient.invalidateQueries({ queryKey: ["invitations"] });
        },
    });

    return query;
};
