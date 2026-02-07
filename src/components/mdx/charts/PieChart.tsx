'use client';

import { Pie, PieChart as RechartsPieChart, Cell, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface PieChartProps {
  title?: string;
  description?: string;
  data: any[];
  nameKey: string;
  dataKey: string;
}

export function PieChart({ title, description, data, nameKey, dataKey }: PieChartProps) {
  const chartConfig: any = {};
  data.forEach((item, index) => {
    chartConfig[item[nameKey]] = {
      label: item[nameKey],
      color: `hsl(var(--chart-${(index % 5) + 1}))`,
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
          <RechartsPieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`hsl(var(--chart-${(index % 5) + 1}))`}
                />
              ))}
            </Pie>
          </RechartsPieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
