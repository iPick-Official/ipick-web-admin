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
  total: number;
  completed?: number;
  cancelled?: number;
  inactive?: number;
}

interface ChartProps {
  data: RidershipData[];
}

export const MonthlyRidershipChart: React.FC<ChartProps> = ({ data }) => (
  <div className="w-full h-64 bg-white dark:bg-zinc-800 rounded-xl shadow-md p-4 transition-colors">
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
      >
        {/* Grid */}
        <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" vertical={false} />

        {/* X and Y Axis */}
        <XAxis
          dataKey="month"
          tick={{ fill: "#6b7280", fontSize: 12 }}
          axisLine={{ stroke: "#d1d5db" }}
        />
        <YAxis
          tick={{ fill: "#6b7280", fontSize: 12 }}
          axisLine={{ stroke: "#d1d5db" }}
        />

        {/* Tooltip */}
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            borderRadius: 8,
            border: "none",
            color: "#fff",
          }}
          labelStyle={{ fontWeight: 600 }}
        />

        {/* Lines */}
        <Line
          type="monotone"
          dataKey="total"
          name="Total"
          stroke="#1652f9"
          strokeWidth={3}
          dot={{ r: 4, fill: "#1652f9", stroke: "#fff", strokeWidth: 2 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="completed"
          name="Completed"
          stroke="#10b981" // green
          strokeWidth={2}
          dot={{ r: 3, fill: "#10b981", stroke: "#fff", strokeWidth: 1 }}
        />
        <Line
          type="monotone"
          dataKey="cancelled"
          name="Cancelled"
          stroke="#ef4444" // red
          strokeWidth={2}
          dot={{ r: 3, fill: "#ef4444", stroke: "#fff", strokeWidth: 1 }}
        />
        <Line
          type="monotone"
          dataKey="inactive"
          name="Inactive"
          stroke="#6b7280" // gray
          strokeWidth={2}
          dot={{ r: 3, fill: "#6b7280", stroke: "#fff", strokeWidth: 1 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
