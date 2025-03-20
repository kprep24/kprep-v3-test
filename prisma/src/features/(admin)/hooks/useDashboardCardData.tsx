import { FaUsers, FaGem, FaUser, FaUserClock } from "react-icons/fa";
import { useDashboardData } from "../api/dashboard/useDashboardData";
 // Your custom hook

export const useDashboardCardData = () => {
    const { data: dashboardData, isLoading, error } = useDashboardData();

    if (isLoading || error || !dashboardData) {
        return [
            { id: 1, title: "Total Users", icon: <FaUsers />, number: 0 },
            { id: 2, title: "Premium Users", icon: <FaGem />, number: 0 },
            { id: 3, title: "Free Users", icon: <FaUser />, number: 0 },
            { id: 4, title: "Unsign Users", icon: <FaUserClock />, number: 0 },
        ];
    }

    return [
        { id: 1, title: "Total Users", icon: <FaUsers />, number: dashboardData.users.free + dashboardData.users.premium + dashboardData.users.casual },
        { id: 2, title: "Premium Users", icon: <FaGem />, number: dashboardData.users.premium },
        { id: 3, title: "Free Users", icon: <FaUser />, number: dashboardData.users.free },
        { id: 4, title: "Unsign Users", icon: <FaUserClock />, number: dashboardData.users.casual },
    ];
};
