import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { DashboardData } from "../../types/dashboard.types";


export const useDashboardData = () => {
    return useQuery<DashboardData>({
        queryKey: ["dashboards"],
        queryFn: async () => {
            const res = await axiosInstance.get(`/api/dashboard`);
            return res.data; // Ensure this matches `DashboardData` structure
        },
    });
};
