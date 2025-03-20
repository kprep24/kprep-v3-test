import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


function getRepatedQnaList(id: string) {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["repeatedQns"],

        queryFn: async () => {
            const res = await axios.get(`/api/user/repeated-qns`, {
                headers: {
                    Authorization: `${id}`
                }
            });
            return res.data.repeatedQns;
        },
    });
    return query;
}

export default getRepatedQnaList;


// const query = useQuery({
//     queryKey: ["branche"],
//     queryFn: async () => {
//         const res: any = await axiosInstance.get(`/api/branch/get-branches`);
//         // console.log(data)
//         return res.branches;
//     },
// });
// return query;