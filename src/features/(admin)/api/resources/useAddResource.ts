import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";




export const useAddResource = () => {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: async (formData: any) => {

            const res = await axiosInstance.post("/api/resource/add-resource", formData, {
                withCredentials: true,
            });
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resources"] });
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
}