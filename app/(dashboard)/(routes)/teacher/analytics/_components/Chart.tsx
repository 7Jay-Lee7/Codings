"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "@/components/ui/card";

interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

export const Chart = ({
  data
}: ChartProps) => {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#FFFFFF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#FFFFFF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `£${value}`}
          />
          <Bar
            dataKey="total"
            fill="#228B22"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}