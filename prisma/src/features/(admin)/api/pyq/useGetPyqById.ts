import axiosInstance from "@/lib/axiosInstance"
import { useQuery } from "@tanstack/react-query"



function useGetPyqById(id: string | null) {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["pyq", id],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/pyq/data/${id}`);
            // console.log(data)
            return res.pyq;
        },
    });
    return query;
}

export default useGetPyqById
