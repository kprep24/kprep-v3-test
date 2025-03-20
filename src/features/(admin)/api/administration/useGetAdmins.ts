import axiosInstance from "@/lib/axiosInstance"
import { Admin } from "@prisma/client";
import { useQuery } from "@tanstack/react-query"



function useGetAdmins() {
    const query = useQuery({
        queryKey: ["admins"],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/admin/protected/admins`);
            // console.log(data)
            return res.admins;
        },
    });
    return query;
}

export default useGetAdmins
