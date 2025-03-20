import axiosInstance from "@/lib/axiosInstance";
import { Role } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useSetUpUser = () => {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: async ({ branchId, semester, year, id, name, email }: {
            semester: string, branchId: string, year: string, id: string, email: string, name: string
        }) => {

            return await axios.post(`/api/user/set-up/${id}`, {
                branchId, semester, year, name, email
            }, {
                headers: {
                    Authorization: `${id}`
                }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["branch"] });
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
