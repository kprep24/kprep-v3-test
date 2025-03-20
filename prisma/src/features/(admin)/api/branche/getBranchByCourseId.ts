import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


function getBranchByCourseId() {
    const queryClient = useQueryClient();
    const query = useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["branches"] });
        },
        onError: (error) => {
            console.log("THE QUERY ERROR", error)
            console.error("Error adding admin:", error);
        },
        mutationFn: async ({ courseId }: {
            courseId: string
        }) => {
            return await axiosInstance.get(`/api/branch/branches/${courseId}`);
        },
    });
    return query;
}

export default getBranchByCourseId
