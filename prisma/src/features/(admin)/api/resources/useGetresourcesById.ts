


import axiosInstance from '@/lib/axiosInstance';
import { useQuery } from '@tanstack/react-query';


function useGetresourcesById(id: string | null) {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["resources", id],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/resource/view/${id}`);
            // console.log(data)
            return res.resource;
        },
    });
    return query;
}

export default useGetresourcesById
