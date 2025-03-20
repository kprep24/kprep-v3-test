import axiosInstance from "@/lib/axiosInstance";
import { IgetSubjectCredentials } from "@/services/subject.services";
import { useQuery } from "@tanstack/react-query";


function useGetSubjectByCredentials({ courseId, year }: IgetSubjectCredentials) {
    const enableHandler = year;
    const courseYear = courseId.concat(year);
    const query = useQuery({
        enabled: !!year,
        queryKey: ["subject", year],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/subject/${year}/${courseId}`);
            // console.log(data)
            return res.subjects;
        },
    });
    return query;
}

export default useGetSubjectByCredentials
