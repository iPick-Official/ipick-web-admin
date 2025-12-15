import { BarChart2, History, Clock10Icon, CloudDrizzle, FolderClock, Cog, Locate, Coins, MessageCircle, AlertOctagon, UserCheck2Icon, FileJson } from "lucide-react";
import { BsPersonFillGear, BsPeople } from "react-icons/bs";
import { FaTrafficLight } from "react-icons/fa";

export const navSections = [
    {
        title: "Driver Management",
        items: [
            { label: "Bookings", icon: <History size={20} />, path: "/admin/bookings" },
            { label: "Drivers Info", icon: <BsPersonFillGear size={20} />, path: "/admin/drivers" },
            { label: "Drivers Location", icon: <Locate size={20} />, path: "/admin/dashboard" },
        ],
    },
    {
        title: "CRM",
        items: [
            { label: "Passengers Info", icon: <BsPeople size={20} />, path: "/admin/riders" },
            { label: "Feedback", icon: <MessageCircle size={20} />, path: "/admin/feedback" },
            { label: "Reports", icon: <AlertOctagon size={20} />, path: "/admin/reports" },
        ],
    },
    {
        title: "Fare Matrix Management",
        items: [
            { label: "Peak Hour Time", icon: <Clock10Icon size={20} />, path: "/admin/peak" },
            { label: "Rainy Day Surge", icon: <CloudDrizzle size={20} />, path: "/admin/rainy" },
            { label: "Traffic Intentsity Surge", icon: <FaTrafficLight size={20} />, path: "/admin/traffic" },
            { label: "Time Matrix", icon: <FolderClock size={20} />, path: "/admin/matrix" },
            { label: "TNVS Configuration", icon: <Cog size={20} />, path: "/admin/config" },
        ],
    },
    {
        title: "Finance",
        items: [
            { label: "Finance", icon: <Coins size={20} />, path: "/admin/finance" },
        ],
    },
    {
        title: "Admin Management",
        items: [
            { label: "Employee Info", icon: <BsPeople size={20} />, path: "/admin/employee" },
            { label: "Role Info", icon: <UserCheck2Icon size={20} />, path: "/admin/role" },
            { label: "Analysis", icon: <BarChart2 size={20} />, path: "/admin/analytics" },
            { label: "JSON View", icon: <FileJson size={20} />, path: "/admin/json-view" },
        ],
    },
];
