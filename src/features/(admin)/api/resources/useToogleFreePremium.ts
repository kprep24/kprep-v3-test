import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";


function useToogleFreePremium() {
    const queryClient = useQueryClient();
    let eId="";
    const query = useMutation({
        mutationFn: async (id: string) => {
            eId = id;
            const res = await axiosInstance.get(`/api/resource/freePremium?id=${id}`);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resources"] });
        }
    });

    return query;
}

export default useToogleFreePremium
