import axiosInstance from "@/lib/axiosInstance";
import { Role } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddAdmins = () => {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: async ({ firstName, role, email, userId }: {
            firstName: string;
            role: Role;
            email: string;
            userId: string

        }) => {

            const res = await axiosInstance.post(`/api/admin/protected/add-admin`, {
                firstName,
                role,
                email,
                userId
            });
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
