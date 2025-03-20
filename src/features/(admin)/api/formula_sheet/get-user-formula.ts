import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";



function useGetUserFormula(id: string, year: string) {
    const query = useQuery({
        queryKey: ["formula_user"],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/formula?year=${year}`, {
                headers: {
                    Authorization: `${id}`
                }
            });
            // console.log(data)
            return res.formulaSheets.Formula;
        },
    });
    return query;
}

export default useGetUserFormula;
