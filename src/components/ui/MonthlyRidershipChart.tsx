"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface RidershipData {
  month: string;
  riders: number;
}

interface ChartProps {
  data: RidershipData[];
}

export const MonthlyRidershipChart: React.FC<ChartProps> = ({ data }) => (
  <div className="w-full h-64">
    <ResponsiveContainer>
      <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="riders" stroke="#f97316" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
