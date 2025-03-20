import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";


export const signInApi = async (email: string, password: string) => {


    const response = await axios.post('/api/admin/sign-in', {
        email, password
    });
    return response;

}