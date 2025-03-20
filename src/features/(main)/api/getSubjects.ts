import { useQuery } from "@tanstack/react-query";
import axios from "axios";



function getSubjectsList(id: string) {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["subjectList"],

        queryFn: async () => {
            const res = await axios.get(`/api/user/subjects`, {
                headers: {
                    Authorization: `${id}`
                }
            });
            return res.data.subjects;
        },
    });
    return query;
}

export default getSubjectsList;