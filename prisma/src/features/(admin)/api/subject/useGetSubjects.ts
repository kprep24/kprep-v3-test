import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";



export function useGetSubjects(selectedYear: string, searchText: string, page: number) {
    const pageYear = selectedYear.concat(page.toString());
    const query = useQuery({
        queryKey: page && selectedYear ? ["subjects", pageYear] : searchText && searchText.length >= 5 ? ["subjects", searchText] : ["subjects", page],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/subject/get-subjects?year=${selectedYear}&subDetails=${searchText}&page=${page}`);
            // console.log(data)
            return res;
        },
    });
    return query;
}