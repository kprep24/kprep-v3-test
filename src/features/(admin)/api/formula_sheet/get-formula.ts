import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";



function useGetFormula() {
    const query = useQuery({
        queryKey: ["formula"],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/formula/admin`);
            // console.log(data)
            return res.formulaSheets;
        },
    });
    return query;
}

export default useGetFormula;
