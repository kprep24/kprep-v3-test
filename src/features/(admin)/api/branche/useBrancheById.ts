import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/axiosInstance"

const useBrancheById = (id: string | undefined) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["branches", id],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/branch/get-branche/${id}`);
            return res.branche;
        }
    });
    return query;
}

export default useBrancheById