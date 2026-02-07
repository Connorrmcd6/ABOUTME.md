'use client';

import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface BarChartProps {
  title?: string;
  description?: string;
  data: any[];
  xAxis: string;
  yAxis: string | string[];
}

export function BarChart({ title, description, data, xAxis, yAxis }: BarChartProps) {
  const yAxisArray = Array.isArray(yAxis) ? yAxis : [yAxis];

  const chartConfig: any = {};
  yAxisArray.forEach((key, index) => {
    chartConfig[key] = {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      color: `var(--chart-${(index % 5) + 1})`,
    };
  });

  return (
    <Card className="my-6">
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <RechartsBarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey={xAxis} className="text-xs" />
            <YAxis className="text-xs" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            {yAxisArray.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={`var(--chart-${(index % 5) + 1})`}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
