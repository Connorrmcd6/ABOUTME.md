'use client';

import { Area, AreaChart as RechartsAreaChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface AreaChartProps {
  title?: string;
  description?: string;
  data: any[];
  xAxis: string;
  yAxis: string | string[];
}

export function AreaChart({ title, description, data, xAxis, yAxis }: AreaChartProps) {
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
          <RechartsAreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey={xAxis} className="text-xs" />
            <YAxis className="text-xs" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            {yAxisArray.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={`var(--chart-${(index % 5) + 1})`}
                fill={`var(--chart-${(index % 5) + 1})`}
                fillOpacity={0.6}
                strokeWidth={2}
              />
            ))}
          </RechartsAreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
