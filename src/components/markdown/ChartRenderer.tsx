'use client';

import { Bar, BarChart, Line, LineChart, Area, AreaChart, Pie, PieChart, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface ChartData {
  title?: string;
  description?: string;
  data: any[];
  // Support both naming conventions
  xAxis?: string;
  yAxis?: string | string[];
  xKey?: string;
  yKeys?: string[];
  // Axis labels
  xLabel?: string;
  yLabel?: string;
  // Formatting
  yUnit?: string; // e.g., "dollars", "percent"
  yScale?: 'linear' | 'log'; // Scale type
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
  const {
    title,
    description,
    data,
    colors = DEFAULT_COLORS,
    yUnit,
    yScale = 'linear',
    xLabel,
    yLabel,
  } = config;

  // Normalize field names (support both conventions)
  const xKey = config.xKey || config.xAxis;
  const yKeys = config.yKeys || (Array.isArray(config.yAxis) ? config.yAxis : config.yAxis ? [config.yAxis] : []);

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">No data available for chart</p>
        </CardContent>
      </Card>
    );
  }

  // Format value based on unit
  const formatValue = (value: number) => {
    if (!yUnit) return value.toLocaleString();

    switch (yUnit) {
      case 'dollars':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          notation: value >= 1000000 ? 'compact' : 'standard',
          maximumFractionDigits: 0,
        }).format(value);
      case 'percent':
        return `${value}%`;
      default:
        return value.toLocaleString();
    }
  };

  // Build chart config for shadcn
  const chartConfig: any = {};
  yKeys.forEach((key, index) => {
    chartConfig[key] = {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      color: colors[index % colors.length],
    };
  });

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              {xKey && <XAxis dataKey={xKey} className="text-xs" label={xLabel ? { value: xLabel, position: 'bottom' } : undefined} />}
              <YAxis
                className="text-xs"
                scale={yScale}
                tickFormatter={formatValue}
                label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft' } : undefined}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: any) => formatValue(Number(value))}
              />
              <Legend />
              {yKeys.map((key, index) => (
                <Bar key={key} dataKey={key} fill={colors[index % colors.length]} radius={[4, 4, 0, 0]} />
              ))}
            </BarChart>
          </ChartContainer>
        );

      case 'line':
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              {xKey && <XAxis dataKey={xKey} className="text-xs" label={xLabel ? { value: xLabel, position: 'bottom' } : undefined} />}
              <YAxis
                className="text-xs"
                scale={yScale}
                tickFormatter={formatValue}
                label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft' } : undefined}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: any) => formatValue(Number(value))}
              />
              <Legend />
              {yKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ fill: colors[index % colors.length] }}
                />
              ))}
            </LineChart>
          </ChartContainer>
        );

      case 'area':
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              {xKey && <XAxis dataKey={xKey} className="text-xs" label={xLabel ? { value: xLabel, position: 'bottom' } : undefined} />}
              <YAxis
                className="text-xs"
                scale={yScale}
                tickFormatter={formatValue}
                label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft' } : undefined}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: any) => formatValue(Number(value))}
              />
              <Legend />
              {yKeys.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  fill={colors[index % colors.length]}
                  fillOpacity={0.6}
                />
              ))}
            </AreaChart>
          </ChartContainer>
        );

      case 'pie':
        // For pie charts, assume data has 'name' and 'value' properties
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: any) => formatValue(Number(value))}
              />
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
