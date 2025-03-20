
import { signInApi } from "@/app/api/adminApi";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";


function useSignIn() {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({ email, password }: { email: string, password: string }) => {
            const response = await signInApi(email, password)
            return response;
        },
    });
    return mutation;
}

export default useSignIn;
