import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


export const useSetUpAccount = () => {
   

    const mutation = useMutation({
        mutationFn: async ({ firstName, lastName, password, token }: { firstName: string, lastName: string, password: string, token: string }) => {
            const response = axios.post(`/api/admin/set-up-user/${token}`, {
                firstName, lastName, password
            });
            return response;
        },
    });
    return mutation;
}