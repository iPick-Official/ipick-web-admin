import { ReactNode } from "react";

interface StatsCardItem {
  id: string;
  label: string;
  value: number | string;
  color?: string; // e.g. "green", "blue", "red"
  icon?: ReactNode;
}

export interface StatsCardProps {
  items: StatsCardItem[];
  columns?: number;
  className?: string;
}

export interface StatsCardWithFilterProps extends StatsCardProps {
  onFilter?: (id: string) => void; // callback when a card is clicked
}

export interface DriverStats {
  driverId: string;
  totalBookings: number;
  finished: number;
  cancelled: number;
  inactive: number;
}
