

import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


function getReaptedQnaURL(id: string, rId: string) {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["rQNA",id],

        queryFn: async () => {
            const res = await axios.get(`/api/user/repeated-qns/${rId}`, {
                headers: {
                    Authorization: `${id}`
                }
            });
            return res.data.url;
        },
    });
    return query;
}

export default getReaptedQnaURL;