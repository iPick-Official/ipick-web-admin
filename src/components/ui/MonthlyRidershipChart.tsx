"use client";

import {
  BarChart,
  Bar,
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
  <div className="w-full h-72 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-5 transition-colors">
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        barCategoryGap="30%"
      >
        {/* Gradients */}
        <defs>
          <linearGradient id="blue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.4} />
          </linearGradient>
          <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0.4} />
          </linearGradient>
          <linearGradient id="red" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#ef4444" stopOpacity={0.4} />
          </linearGradient>
          <linearGradient id="gray" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6b7280" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#6b7280" stopOpacity={0.4} />
          </linearGradient>
        </defs>

        {/* Grid */}
        <CartesianGrid
          vertical={false}
          strokeDasharray="3 3"
          stroke="#e5e7eb"
        />

        {/* Axes */}
        <XAxis
          dataKey="month"
          tick={{ fill: "#9ca3af", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#9ca3af", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        {/* Tooltip */}
        <Tooltip
          cursor={{ fill: "rgba(0,0,0,0.04)" }}
          contentStyle={{
            backgroundColor: "#111827",
            borderRadius: 12,
            border: "none",
            color: "#fff",
            fontSize: "0.8rem",
          }}
          labelStyle={{ fontWeight: 600 }}
        />

        {/* Stacked Bars */}
        <Bar
          dataKey="completed"
          stackId="a"
          fill="url(#green)"
          radius={[0, 0, 0, 0]}
          animationDuration={800}
        />
        <Bar
          dataKey="cancelled"
          stackId="a"
          fill="url(#red)"
          radius={[0, 0, 0, 0]}
          animationDuration={800}
        />
        <Bar
          dataKey="inactive"
          stackId="a"
          fill="url(#gray)"
          radius={[0, 0, 0, 0]}
          animationDuration={800}
        />

        {/* Total overlay (top highlight) */}
        <Bar
          dataKey="total"
          fill="url(#blue)"
          radius={[8, 8, 0, 0]}
          barSize={28}
          animationDuration={1000}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);