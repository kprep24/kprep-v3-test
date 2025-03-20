
import {
    FaUserShield, FaCrown, FaUser, FaStickyNote, FaGem, FaBookOpen, FaGlobe, FaLock,
    FaFileAlt, FaStar, FaClipboardCheck, FaSyncAlt, FaBook, FaGraduationCap
} from "react-icons/fa";
import { useDashboardData } from "../api/dashboard/useDashboardData";
import { DashboardData } from "../types/dashboard.types";

export const useDashboardCards = () => {
    const { data, isLoading, error } = useDashboardData();

    if (isLoading || error) {
        return { cards: [], isLoading, error };
    }

    const dashboardData = data; // Assuming the API returns the structured `DashboardData` interface

    const dashboardCardItemRow1 = [
        { id: 1, title: "Administrator", icon: <FaUserShield />, number: (dashboardData?.administations?.admin ?? 0) + (dashboardData?.administations?.superAdmin ?? 0) },
        { id: 2, title: "Super Admin", icon: <FaCrown />, number: dashboardData?.administations?.superAdmin || 0 },
        { id: 3, title: "Admin", icon: <FaUser />, number: dashboardData?.administations?.admin || 0 },
        { id: 4, title: "Notes", icon: <FaStickyNote />, number: (dashboardData?.resources?.free || 0) + (dashboardData?.resources?.premium || 0) },
        { id: 5, title: "Premium Notes", icon: <FaGem />, number: dashboardData?.resources?.premium || 0 },
        { id: 6, title: "Free Notes", icon: <FaBookOpen />, number: dashboardData?.resources?.free || 0 },
        { id: 7, title: "Public Notes", icon: <FaGlobe />, number: dashboardData?.resources?.public || 0 },
        { id: 8, title: "Private Notes", icon: <FaLock />, number: dashboardData?.resources?.private || 0 },
        { id: 9, title: "Total PYQs", icon: <FaFileAlt />, number: (dashboardData?.pyqs?.mid ?? 0) + (dashboardData?.pyqs?.end ?? 0) },
        { id: 10, title: "Mid Sem PYQs", icon: <FaBookOpen />, number: dashboardData?.pyqs?.mid || 0 },
        { id: 11, title: "End Sem PYQs", icon: <FaBookOpen />, number: dashboardData?.pyqs?.end || 0 },
        { id: 12, title: "Premium PYQs", icon: <FaStar />, number: dashboardData?.pyqs?.premium || 0 },
        { id: 13, title: "Free PYQs", icon: <FaBookOpen />, number: dashboardData?.pyqs?.free || 0 },
        { id: 14, title: "Public PYQs", icon: <FaGlobe />, number: dashboardData?.pyqs?.public || 0 },
        { id: 15, title: "Private PYQs", icon: <FaLock />, number: dashboardData?.pyqs?.private || 0 },
        { id: 16, title: "Solutions", icon: <FaClipboardCheck />, number: dashboardData?.solutions?.total || 0 },
        { id: 17, title: "Repeated Questions", icon: <FaSyncAlt />, number: (dashboardData?.repeatedQuestions?.public ?? 0) + (dashboardData?.repeatedQuestions?.private ?? 0) },
        { id: 18, title: "Public Repeated Questions", icon: <FaGlobe />, number: dashboardData?.repeatedQuestions?.public || 0 },
        { id: 19, title: "Private Repeated Questions", icon: <FaLock />, number: dashboardData?.repeatedQuestions?.private || 0 },
        { id: 20, title: "Number of Subjects", icon: <FaBook />, number: dashboardData?.subjects?.total || 0 },
        { id: 21, title: "Number of Courses", icon: <FaGraduationCap />, number: dashboardData?.courses?.courses || 0 },
    ];

    return { cards: dashboardCardItemRow1, isLoading, error };
};
