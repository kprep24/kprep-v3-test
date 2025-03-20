import axiosInstance from "@/lib/axiosInstance"
import { Admin } from "@prisma/client";
import { useQuery } from "@tanstack/react-query"



function useGetInvitation() {
    const query = useQuery({
        queryKey: ["invitations"],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/admin/protected/invitations`);
            // console.log(data)
            return res.invitations;
        },
    });
    return query;
}

export default useGetInvitation;
