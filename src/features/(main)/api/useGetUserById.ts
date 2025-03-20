import UaxiosInstance from "@/lib/userAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useGetUserById(id: string | undefined) {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["userInfo"],
        queryFn: async () => {
            const res: any = await axios.get(`/api/user/bio/${id}`, {
                headers: {
                    Authorization: `${id}`
                }
            });
            // console.log("THE USER HOOK IS",res)
            return res.data.user;
        },
    });
    return query;
}

export default useGetUserById;
