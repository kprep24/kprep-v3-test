import axiosInstance from "@/lib/axiosInstance";
import { Role } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddQna = () => {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: async (formData: any) => {
            // console.log("========>",formData)
            const res = await axiosInstance.post("/api/repated/add", formData, {
                withCredentials: true,
            });
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rpyq"] });
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
