'use client';

import type { MDXComponents } from 'mdx/types';
import dynamic from 'next/dynamic';
import { markdownComponents } from '../markdown/MarkdownElements';

// Dynamically import wrapper components to ensure client-side only rendering
const CustomBarChart = dynamic(() => import('./charts/BarChart').then(mod => ({ default: mod.BarChart })), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
});

const CustomLineChart = dynamic(() => import('./charts/LineChart').then(mod => ({ default: mod.LineChart })), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
});

const CustomAreaChart = dynamic(() => import('./charts/AreaChart').then(mod => ({ default: mod.AreaChart })), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
});

const CustomPieChart = dynamic(() => import('./charts/PieChart').then(mod => ({ default: mod.PieChart })), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
});

const Callout = dynamic(() => import('./elements/Callout').then(mod => ({ default: mod.Callout })), {
  ssr: false
});

// Dynamically import recharts components
let Recharts: any = null;
if (typeof window !== 'undefined') {
  Recharts = require('recharts');
}

export function getMDXComponents(): MDXComponents {
  const components: MDXComponents = {
    // Shared markdown element styling
    ...markdownComponents,

    // Custom wrapper components (use these for simple charts)
    CustomBarChart,
    CustomLineChart,
    CustomAreaChart,
    CustomPieChart,
    Callout,
  };

  // Add raw recharts components only on client side
  if (Recharts) {
    Object.assign(components, {
      ResponsiveContainer: Recharts.ResponsiveContainer,
      LineChart: Recharts.LineChart,
      Line: Recharts.Line,
      BarChart: Recharts.BarChart,
      Bar: Recharts.Bar,
      PieChart: Recharts.PieChart,
      Pie: Recharts.Pie,
      Cell: Recharts.Cell,
      XAxis: Recharts.XAxis,
      YAxis: Recharts.YAxis,
      Tooltip: Recharts.Tooltip,
      Legend: Recharts.Legend,
      CartesianGrid: Recharts.CartesianGrid,
      AreaChart: Recharts.AreaChart,
      Area: Recharts.Area,
    });
  }

  return components;
}
