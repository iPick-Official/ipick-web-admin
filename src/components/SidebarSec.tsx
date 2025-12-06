import { BarChart2, LayoutDashboard, History, Clock10Icon, CloudDrizzle, FolderClock, Cog, Locate } from "lucide-react";
import { BsPersonFillGear, BsPerson, BsPeople } from "react-icons/bs";
import { FaTrafficLight } from "react-icons/fa";

export const navSections = [
    {
        title: "Driver Management",
        items: [
            { label: "Bookings", icon: <History size={20} />, path: "/bookings" },
            { label: "Drivers", icon: <BsPersonFillGear size={20} />, path: "/drivers" },
            { label: "Driver's Location", icon: <Locate size={20} />, path: "/dashboard" },
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
        title: "CRM",
        items: [
            { label: "Passengers", icon: <BsPeople size={20} />, path: "/riders" },
        ],
    },
    {
        title: "Admin Management",
        items: [
            { label: "Pricing", icon: <BarChart2 size={20} />, path: "/analytics" },
            { label: "JSON View", icon: <BsPerson size={20} />, path: "/json-view" },
        ],
    },
];
