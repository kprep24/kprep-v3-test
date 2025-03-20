import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


function getResourcesList(id: string) {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["userResource"],

        queryFn: async () => {
            const res = await axios.get(`/api/user/resources`, {
                headers: {
                    Authorization: `${id}`
                }
            });
            return res.data.resource;
        },
    });
    return query;
}

export default getResourcesList;


// const query = useQuery({
//     queryKey: ["branche"],
//     queryFn: async () => {
//         const res: any = await axiosInstance.get(`/api/branch/get-branches`);
//         // console.log(data)
//         return res.branches;
//     },
// });
// return query;