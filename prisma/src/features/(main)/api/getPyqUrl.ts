

import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


function getPyqUrl(id: string, rId: string) {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["pyqView",id],

        queryFn: async () => {
            const res = await axios.get(`/api/user/get-pyq/${rId}`, {
                headers: {
                    Authorization: `${id}`
                }
            });
            return res.data.url;
        },
    });
    return query;
}

export default getPyqUrl;