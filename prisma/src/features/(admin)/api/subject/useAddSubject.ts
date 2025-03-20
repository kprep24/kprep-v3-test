import axiosInstance from "@/lib/axiosInstance";
import { Role } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod"
export const useAddSubject = () => {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: async (data: any) => {

            return await axiosInstance.post(`/api/subject/add-subject`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subject"] });
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
