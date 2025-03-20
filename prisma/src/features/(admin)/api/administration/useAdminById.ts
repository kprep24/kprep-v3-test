import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/axiosInstance"

const useAdminById = (id: string | undefined) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["admins", id],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/admin/protected/${id}`);
            return res.user;
        }
    });
    return query;
}

export default useAdminById