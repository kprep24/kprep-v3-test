import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


function getBranchList(id: string) {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["userBranch"],

        queryFn: async () => {
            const res = await axios.get(`/api/user/branch`, {
                headers: {
                    Authorization: `${id}`
                }
            });
            return res.data.branches;
        },
    });
    return query;
}

export default getBranchList;


// const query = useQuery({
//     queryKey: ["branche"],
//     queryFn: async () => {
//         const res: any = await axiosInstance.get(`/api/branch/get-branches`);
//         // console.log(data)
//         return res.branches;
//     },
// });
// return query;