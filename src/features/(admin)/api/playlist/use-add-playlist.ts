import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export const useAddPlaylist = () => {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: async (data: any) => {
            const res = await axiosInstance.post(`/api/playlist/admin`, data );
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["playlist"] });
        },
        onError: (error) => {
            console.error("Error adding admin:", error);
        }
    });

    return query;
}

