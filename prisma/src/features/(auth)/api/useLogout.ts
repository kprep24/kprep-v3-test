
import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query"



function useLogout() {


    const mutation = useMutation({
        mutationFn: async () => {
            const user = axiosInstance.get("/api/admin/protected/sign-out");
            return user;
        },
    });
    return mutation;
}

export default useLogout;
