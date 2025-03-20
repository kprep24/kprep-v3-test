import axiosInstance from "@/lib/axiosInstance"
import { Admin } from "@prisma/client";
import { useQuery } from "@tanstack/react-query"



function useGetPyqs(page: number, selectedYear: string, subject: string, windowSize: number) {
    const pageWindow = page.toString().concat(windowSize.toString());
    const pageWindowYear = page.toString().concat(windowSize.toString()).concat(selectedYear);
    const pageWindowYearSubject = page.toString().concat(windowSize.toString()).concat(selectedYear).concat(subject);
    const query = useQuery({
        queryKey: page && windowSize && selectedYear ? ["pyq", pageWindowYear] : page && windowSize && selectedYear && subject ? ["pyq", pageWindowYearSubject] : ["pyq", pageWindow],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/pyq?page=${page}&subjectId=${subject}&year=${selectedYear}&offset=${windowSize}`);
            // console.log(data)
            return res.pyqs;
        },
    });
    return query;
}

export default useGetPyqs
