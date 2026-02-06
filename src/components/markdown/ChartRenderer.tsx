'use client';

import { Bar, BarChart, Line, LineChart, Area, AreaChart, Pie, PieChart, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface ChartData {
  title?: string;
  description?: string;
  data: any[];
  xAxis?: string;
  yAxis?: string | string[];
  colors?: string[];
}

interface ChartRendererProps {
  type: 'bar' | 'line' | 'area' | 'pie';
  config: ChartData;
}

const DEFAULT_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function ChartRenderer({ type, config }: ChartRendererProps) {
  const { title, description, data, xAxis, yAxis, colors = DEFAULT_COLORS } = config;

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">No data available for chart</p>
        </CardContent>
      </Card>
    );
  }

  // Build chart config for shadcn
  const chartConfig: any = {};
  if (Array.isArray(yAxis)) {
    yAxis.forEach((key, index) => {
      chartConfig[key] = {
        label: key.charAt(0).toUpperCase() + key.slice(1),
        color: colors[index % colors.length],
      };
    });
  } else if (yAxis) {
    chartConfig[yAxis] = {
      label: yAxis.charAt(0).toUpperCase() + yAxis.slice(1),
      color: colors[0],
    };
  }

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              {xAxis && <XAxis dataKey={xAxis} className="text-xs" />}
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {Array.isArray(yAxis) ? (
                yAxis.map((key, index) => (
                  <Bar key={key} dataKey={key} fill={colors[index % colors.length]} radius={[4, 4, 0, 0]} />
                ))
              ) : yAxis ? (
                <Bar dataKey={yAxis} fill={colors[0]} radius={[4, 4, 0, 0]} />
              ) : null}
            </BarChart>
          </ChartContainer>
        );

      case 'line':
        return (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              {xAxis && <XAxis dataKey={xAxis} className="text-xs" />}
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {Array.isArray(yAxis) ? (
                yAxis.map((key, index) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={colors[index % colors.length]}
                    strokeWidth={2}
                    dot={{ fill: colors[index % colors.length] }}
                  />
                ))
              ) : yAxis ? (
                <Line type="monotone" dataKey={yAxis} stroke={colors[0]} strokeWidth={2} dot={{ fill: colors[0] }} />
              ) : null}
            </LineChart>
          </ChartContainer>
        );

      case 'area':
        return (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              {xAxis && <XAxis dataKey={xAxis} className="text-xs" />}
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {Array.isArray(yAxis) ? (
                yAxis.map((key, index) => (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={colors[index % colors.length]}
                    fill={colors[index % colors.length]}
                    fillOpacity={0.6}
                  />
                ))
              ) : yAxis ? (
                <Area type="monotone" dataKey={yAxis} stroke={colors[0]} fill={colors[0]} fillOpacity={0.6} />
              ) : null}
            </AreaChart>
          </ChartContainer>
        );

      case 'pie':
        // For pie charts, assume data has 'name' and 'value' properties
        return (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ChartContainer>
        );

      default:
        return <p className="text-sm text-muted-foreground">Unknown chart type: {type}</p>;
    }
  };

  return (
    <Card className="my-6">
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
}
