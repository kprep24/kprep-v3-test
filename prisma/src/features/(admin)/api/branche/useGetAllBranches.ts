import axiosInstance from "@/lib/axiosInstance"
import { useQuery } from "@tanstack/react-query"



function useGetBranches() {
    const query = useQuery({
        queryKey: ["branches"],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/branch/get-branches`);
            // console.log(data)
            return res.branches;
        },
    });
    return query;
}

export default useGetBranches
