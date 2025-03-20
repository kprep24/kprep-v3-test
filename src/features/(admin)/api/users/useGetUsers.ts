import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";



export function useGetUsers(page: number, rollNo: string | null, windowSize: number) {
    const pageRollNo = rollNo && rollNo.concat(page.toString());
    const pageWindowSize = page.toString().concat(windowSize.toString());
    return useQuery({
        queryKey: rollNo && rollNo ? ["users", pageRollNo] : ["users", pageWindowSize],
        queryFn: async () => {
            const res = await axiosInstance.get(`/api/users?page=${page}&limit=${windowSize}&roll=${rollNo}`);
            return res;
        },
    });
}