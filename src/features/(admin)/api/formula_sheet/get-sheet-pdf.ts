import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";



function useGetSheetPdf(id: string, pdfId: string) {
    const query = useQuery({
        queryKey: ["formula_user_pdf"],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/formula/get-pdf?pdfId=${pdfId}`, {
                headers: {
                    Authorization: `${id}`
                }
            });
            // console.log(data)
            return res.url;
        },
    });
    return query;
}

export default useGetSheetPdf;
