import { BarChart2, History, Clock10Icon, CloudDrizzle, FolderClock, Cog, Locate, Coins, MessageCircle, AlertOctagon, UserCheck2Icon, FileJson } from "lucide-react";
import { BsPersonFillGear, BsPeople } from "react-icons/bs";
import { FaTrafficLight } from "react-icons/fa";

export const navSections = [
    {
        title: "Driver Management",
        items: [
            { label: "Bookings", icon: <History size={20} />, path: "/bookings" },
            { label: "Drivers Info", icon: <BsPersonFillGear size={20} />, path: "/drivers" },
            { label: "Drivers Location", icon: <Locate size={20} />, path: "/dashboard" },
        ],
    },
    {
        title: "CRM",
        items: [
            { label: "Passengers Info", icon: <BsPeople size={20} />, path: "/riders" },
            { label: "Feedback", icon: <MessageCircle size={20} />, path: "/feedback" },
            { label: "Reports", icon: <AlertOctagon size={20} />, path: "/reports" },
        ],
    },
    {
        title: "Fare Matrix Management",
        items: [
            { label: "Peak Hour Time", icon: <Clock10Icon size={20} />, path: "/peak" },
            { label: "Rainy Day Surge", icon: <CloudDrizzle size={20} />, path: "/rainy" },
            { label: "Traffic Intentsity Surge", icon: <FaTrafficLight size={20} />, path: "/traffic" },
            { label: "Time Matrix", icon: <FolderClock size={20} />, path: "/matrix" },
            { label: "TNVS Configuration", icon: <Cog size={20} />, path: "/config" },
        ],
    },
    {
        title: "Finance",
        items: [
            { label: "Finance", icon: <Coins size={20} />, path: "/finance" },
        ],
    },
    {
        title: "Admin Management",
        items: [
            { label: "Employee Info", icon: <BsPeople size={20} />, path: "/employee" },
            { label: "Role Info", icon: <UserCheck2Icon size={20} />, path: "/role" },
            { label: "Analysis", icon: <BarChart2 size={20} />, path: "/analytics" },
            { label: "JSON View", icon: <FileJson size={20} />, path: "/json-view" },
        ],
    },
];
