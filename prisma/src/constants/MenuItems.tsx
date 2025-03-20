"use client";

import { Youtube } from 'lucide-react';
import {
    FaHome, FaUserShield, FaUsers, FaBook, FaGraduationCap, FaFolder,
    FaFileAlt, FaSyncAlt, FaComments, FaTrash, FaExclamationTriangle,
    FaBell, FaExchangeAlt
} from 'react-icons/fa';

export const navMenusAdmin = [
    {
        title: "Home",
        url: "/dashboard",
        icon: <FaHome />,
    },
    {
        title: "Administrations",
        url: "/administrations",
        icon: <FaUserShield />,
    },
    {
        title: "Course & Branches",
        url: "/course-branches",
        icon: <FaGraduationCap />,
    },
    {
        title: "Subjects",
        url: "/subjects",
        icon: <FaBook />,
    },
    {
        title: "Resources",
        url: "/resources",
        icon: <FaFolder />,
    },
    {
        title: "Pyqs",
        url: "/pyqs",
        icon: <FaFileAlt />,
    },
    {
        title: "Repeated Questions",
        url: "/repated-question",
        icon: <FaSyncAlt />,
    },
    {
        title: "Formula Sheet",
        url: "/formula-sheet",
        icon: <FaFileAlt />, // Added icon for Formula Sheet
    },
    {
        title: "Reports & Feedback",
        url: "/reports-feedback",
        icon: <FaExclamationTriangle />,
    },
    {
        title: "Playlits",
        url: "/youtube-playlists",
        icon: <Youtube />
    },
    {
        title: "Comments & Replies",
        url: "/comments-replies",
        icon: <FaComments />,
    },
    {
        title: "Trash",
        url: "/trash",
        icon: <FaTrash />,
    },

    {
        title: "Notifications",
        url: "/notifications",
        icon: <FaBell />,
    },
    {
        title: "Section Swapping",
        url: "/section-swapping",
        icon: <FaExchangeAlt />,
    },
];

export const navMenusSuperAdmin = [
    {
        title: "Home",
        url: "/dashboard",
        icon: <FaHome />,
    },
    {
        title: "Administrations",
        url: "/administrations",
        icon: <FaUserShield />,
    },
    {
        title: "Users",
        url: "/users",
        icon: <FaUsers />,
    },
    {
        title: "Course & Branches",
        url: "/course-branches",
        icon: <FaGraduationCap />,
    },
    {
        title: "Subjects",
        url: "/subjects",
        icon: <FaBook />,
    },
    {
        title: "Resources",
        url: "/resources",
        icon: <FaFolder />,
    },
    {
        title: "Pyqs",
        url: "/pyqs",
        icon: <FaFileAlt />,
    },
    {
        title: "Repeated Questions",
        url: "/repated-question",
        icon: <FaSyncAlt />,
    },
    {
        title: "Formula Sheet",
        url: "/formula-sheet",
        icon: <FaFileAlt />, // Added icon for Formula Sheet
    },
    {
        title: "Reports & Feedback",
        url: "/reports-feedback",
        icon: <FaExclamationTriangle />,
    },
    {
        title: "Playlits",
        url: "/youtube-playlists",
        icon: <Youtube />
    },
    {
        title: "Comments & Replies",
        url: "/comments-replies",
        icon: <FaComments />,
    },
    {
        title: "Trash",
        url: "/trash",
        icon: <FaTrash />,
    },

    {
        title: "Notifications",
        url: "/notifications",
        icon: <FaBell />,
    },
    {
        title: "Section Swapping",
        url: "/section-swapping",
        icon: <FaExchangeAlt />,
    },
];
