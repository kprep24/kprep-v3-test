import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


function getPyqsList(id: string) {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["userPyqs"],

        queryFn: async () => {
            const res = await axios.get(`/api/user/pyqs`, {
                headers: {
                    Authorization: `${id}`
                }
            });
            return res.data.pyqs;
        },
    });
    return query;
}

export default getPyqsList;


// const query = useQuery({
//     queryKey: ["branche"],
//     queryFn: async () => {
//         const res: any = await axiosInstance.get(`/api/branch/get-branches`);
//         // console.log(data)
//         return res.branches;
//     },
// });
// return query;