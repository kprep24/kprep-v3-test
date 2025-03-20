

import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


function getSoltion(id: string, rId: string) {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["ViewSol",id],

        queryFn: async () => {
            const res = await axios.get(`/api/user/view-sol/${rId}`, {
                headers: {
                    Authorization: `${id}`
                }
            });
            return res.data.url;
        },
    });
    return query;
}

export default getSoltion;