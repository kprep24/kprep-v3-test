
import {
    FaUserShield, FaCrown, FaUser, FaStickyNote, FaGem, FaBookOpen, FaGlobe, FaLock,
    FaFileAlt, FaStar, FaClipboardCheck, FaSyncAlt, FaBook, FaGraduationCap
} from "react-icons/fa";
import { useDashboardData } from "../api/dashboard/useDashboardData";
import { DashboardData } from "../types/dashboard.types";

export const useYearWisePremimum = () => {
    const { data, isLoading, error } = useDashboardData();

    if (isLoading || error) {
        return { charts: [], isLoading, error };
    }

    const dashboardData = data; // Assuming the API returns the structured `DashboardData` interface

    const charttData = [
        { year: "1st", visitors: dashboardData?.yearWisePremimum.firstYear, fill: "var(--color-chrome)" },
        { year: "2nd", visitors: dashboardData?.yearWisePremimum.secondYear, fill: "var(--color-safari)" },
        { year: "3rd", visitors: dashboardData?.yearWisePremimum.ThirdYear, fill: "var(--color-firefox)" },
    ];

    return { charts: charttData, isLoading, error };
};
