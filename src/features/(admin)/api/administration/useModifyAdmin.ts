import axiosInstance from "@/lib/axiosInstance"
import { Role } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

function useModifyAdmin() {
    const queryClient = useQueryClient();
    const query = useMutation({

        mutationFn: async ({ isBan, role, id }: { isBan: boolean, role: Role, id: string }) => {
            const res = await axiosInstance.post(`/api/admin/protected/edit-user/${id}`, {
                isBan,
                role,
            })
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admins"] });
        }

    })
    return query;
}

export default useModifyAdmin
