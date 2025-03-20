import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";



export const useAddFeedback = (id: string) => {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: async (data: any) => {
            const res = await axios.post(`/api/feedback`, { data },
                {
                    headers: {
                        Authorization: `${id}`
                    }
                }
            );
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
        },
        onError: (error) => {
            console.error("Error adding admin:", error);
        }
    });

    return query;
}