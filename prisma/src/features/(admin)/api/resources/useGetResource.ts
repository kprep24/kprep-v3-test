import axiosInstance from "@/lib/axiosInstance"
import { useQuery } from "@tanstack/react-query"



function useGetResources(page: number, selectedYear: string, subject: string, windowSize: number) {
    const pageWindow = page.toString().concat(windowSize.toString());
    const pageWindowYear = page.toString().concat(windowSize.toString()).concat(selectedYear);
    const pageWindowYearSubject = page.toString().concat(windowSize.toString()).concat(selectedYear).concat(subject);
    const query = useQuery({
        queryKey: page && windowSize && selectedYear ? ["resources", pageWindowYear] : page && windowSize && selectedYear && subject ? ["resources", pageWindowYearSubject] : ["resources", pageWindow],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/resource?page=${page}&subjectId=${subject}&year=${selectedYear}&offset=${windowSize}`);
            // console.log(data)
            return res.resources;
        },
    });
    return query;
}

export default useGetResources
