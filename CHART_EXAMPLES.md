# Chart Examples for Articles

You can now embed interactive charts in your markdown articles using special code blocks!

## Supported Chart Types

- `chart-bar` - Bar charts
- `chart-line` - Line charts
- `chart-area` - Area charts
- `chart-pie` - Pie charts

## Basic Syntax

````markdown
```chart-TYPE
{
  "title": "Chart Title",
  "description": "Chart description",
  "data": [...],
  "xAxis": "fieldName",
  "yAxis": "fieldName" or ["field1", "field2"]
}
```
````

## Example 1: Simple Bar Chart

````markdown
```chart-bar
{
  "title": "Monthly Revenue",
  "description": "Revenue by month in 2024",
  "data": [
    { "month": "Jan", "revenue": 12000 },
    { "month": "Feb", "revenue": 15000 },
    { "month": "Mar", "revenue": 18000 },
    { "month": "Apr", "revenue": 16000 }
  ],
  "xAxis": "month",
  "yAxis": "revenue"
}
```
````

## Example 2: Multi-Series Line Chart

````markdown
```chart-line
{
  "title": "Sales vs Target",
  "description": "Comparing actual sales to targets",
  "data": [
    { "month": "Jan", "sales": 4000, "target": 3500 },
    { "month": "Feb", "sales": 3000, "target": 4000 },
    { "month": "Mar", "sales": 5000, "target": 4500 },
    { "month": "Apr", "sales": 4500, "target": 4000 }
  ],
  "xAxis": "month",
  "yAxis": ["sales", "target"]
}
```
````

## Example 3: Area Chart

````markdown
```chart-area
{
  "title": "User Growth",
  "description": "Active users over time",
  "data": [
    { "week": "Week 1", "users": 100 },
    { "week": "Week 2", "users": 250 },
    { "week": "Week 3", "users": 500 },
    { "week": "Week 4", "users": 850 }
  ],
  "xAxis": "week",
  "yAxis": "users"
}
```
````

## Example 4: Pie Chart

````markdown
```chart-pie
{
  "title": "Market Share",
  "description": "Product distribution by category",
  "data": [
    { "name": "Product A", "value": 400 },
    { "name": "Product B", "value": 300 },
    { "name": "Product C", "value": 200 },
    { "name": "Product D", "value": 100 }
  ]
}
```
````

## Example 5: Multi-Series Bar Chart

````markdown
```chart-bar
{
  "title": "Q1 Performance by Region",
  "description": "Sales and profit by region",
  "data": [
    { "region": "North", "sales": 25000, "profit": 8000 },
    { "region": "South", "sales": 18000, "profit": 6000 },
    { "region": "East", "sales": 30000, "profit": 10000 },
    { "region": "West", "sales": 22000, "profit": 7500 }
  ],
  "xAxis": "region",
  "yAxis": ["sales", "profit"]
}
```
````

## Example 6: Minimal Chart (No Title)

````markdown
```chart-bar
{
  "data": [
    { "label": "A", "value": 10 },
    { "label": "B", "value": 20 },
    { "label": "C", "value": 15 }
  ],
  "xAxis": "label",
  "yAxis": "value"
}
```
````

## Complete Article Example

````markdown
# Q1 2024 Sales Report

Our Q1 performance exceeded expectations across all regions.

## Revenue Overview

Here's how our revenue grew throughout the quarter:

```chart-line
{
  "title": "Quarterly Revenue Growth",
  "description": "Month-over-month revenue in USD",
  "data": [
    { "month": "January", "revenue": 125000, "expenses": 80000 },
    { "month": "February", "revenue": 145000, "expenses": 85000 },
    { "month": "March", "revenue": 178000, "expenses": 90000 }
  ],
  "xAxis": "month",
  "yAxis": ["revenue", "expenses"]
}
```

## Product Performance

Our products performed differently across categories:

```chart-pie
{
  "title": "Revenue by Product Category",
  "data": [
    { "name": "Software", "value": 180000 },
    { "name": "Hardware", "value": 120000 },
    { "name": "Services", "value": 95000 },
    { "name": "Training", "value": 53000 }
  ]
}
```

## Regional Analysis

```chart-bar
{
  "title": "Sales by Region",
  "description": "Total sales across all regions",
  "data": [
    { "region": "North America", "sales": 150000 },
    { "region": "Europe", "sales": 180000 },
    { "region": "Asia", "sales": 95000 },
    { "region": "Other", "value": 23000 }
  ],
  "xAxis": "region",
  "yAxis": "sales"
}
```

## Conclusion

Our Q1 results show strong growth and position us well for Q2.
````

## Data Format Requirements

### Bar, Line, and Area Charts
- **data**: Array of objects
- **xAxis**: String - field name for X-axis (optional)
- **yAxis**: String or Array - field name(s) for Y-axis
- **title**: String (optional)
- **description**: String (optional)

### Pie Charts
- **data**: Array of objects with `name` and `value` properties
- **title**: String (optional)
- **description**: String (optional)

## Styling

Charts automatically use your theme colors from `globals.css`:
- `--chart-1` through `--chart-5` for data series
- Adapts to dark/light mode
- Responsive sizing

## Tips

1. **Keep it simple**: Charts render best with 3-12 data points
2. **Use clear labels**: Make axis names descriptive
3. **Add context**: Use title and description to explain the data
4. **Test JSON**: Validate your JSON before adding to articles
5. **Multiple series**: Use arrays for yAxis to show multiple metrics

## Troubleshooting

**Chart doesn't render?**
- Check JSON syntax (use a JSON validator)
- Ensure required fields are present
- Check browser console for errors

**Chart looks weird?**
- Verify data format matches chart type
- Check field names match data properties
- Ensure data values are numbers

**Colors not showing?**
- Charts use CSS variables from your theme
- Check `globals.css` has `--chart-1` through `--chart-5` defined
