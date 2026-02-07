# Chart @include Guide

Use external JSON files for cleaner, reusable chart data.

## Article Structure

```
your-articles-repo/
└── my-article/
    ├── metadata.json
    ├── article.md
    └── figures/
        ├── chart1.json
        └── chart2.json
```

## Usage in Markdown

In your `article.md`:

```markdown
# My Article

Sports markets, introduced in 2025, now dominate trading activity.

```chart
@include figures/quarterly_volume.json
```

More analysis here...

```chart
@include figures/market_share.json
```
```

## Chart JSON Format

**Example:** `figures/quarterly_volume.json`

```json
{
  "type": "bar",
  "title": "Quarterly Volume",
  "data": [
    { "quarter": "Q1 '24", "volume": 65556361 },
    { "quarter": "Q2 '24", "volume": 93440094 },
    { "quarter": "Q3 '24", "volume": 74388655 }
  ],
  "xKey": "quarter",
  "yKeys": ["volume"],
  "xLabel": "Quarter",
  "yLabel": "Volume (USD)",
  "yUnit": "dollars",
  "yScale": "log"
}
```

### Required Fields

- **`type`**: `"bar"`, `"line"`, `"area"`, or `"pie"`
- **`data`**: Array of data objects
- **`xKey`**: Field name for X-axis (bar/line/area only)
- **`yKeys`**: Array of field names for Y-axis (bar/line/area only)

### Optional Fields

- **`title`**: Chart title
- **`description`**: Chart description
- **`xLabel`**: X-axis label (e.g., "Quarter")
- **`yLabel`**: Y-axis label (e.g., "Volume (USD)")
- **`yUnit`**: Value formatting - `"dollars"`, `"percent"`, or omit for plain numbers
- **`yScale`**: Scale type - `"linear"` (default) or `"log"` (logarithmic)

## Chart Types

### Bar Chart
```json
{
  "type": "bar",
  "title": "Monthly Sales",
  "data": [
    { "month": "Jan", "sales": 4000, "target": 3500 },
    { "month": "Feb", "sales": 3000, "target": 4000 }
  ],
  "xAxis": "month",
  "yAxis": ["sales", "target"]
}
```

### Line Chart
```json
{
  "type": "line",
  "title": "Revenue Growth",
  "data": [
    { "month": "Jan", "revenue": 12000 },
    { "month": "Feb", "revenue": 15000 }
  ],
  "xAxis": "month",
  "yAxis": "revenue"
}
```

### Area Chart
```json
{
  "type": "area",
  "title": "User Growth",
  "data": [
    { "week": "Week 1", "users": 100 },
    { "week": "Week 2", "users": 250 }
  ],
  "xAxis": "week",
  "yAxis": "users"
}
```

### Pie Chart
```json
{
  "type": "pie",
  "title": "Market Share",
  "data": [
    { "name": "Product A", "value": 400 },
    { "name": "Product B", "value": 300 },
    { "name": "Product C", "value": 200 }
  ]
}
```

Note: Pie charts use `name` and `value` fields, not xAxis/yAxis.

## Complete Example

**Repository structure:**
```
articles/
└── kalshi-analysis/
    ├── metadata.json
    ├── article.md
    └── figures/
        ├── quarterly_volume.json
        └── market_breakdown.json
```

**metadata.json:**
```json
{
  "title": "Kalshi Market Analysis 2025",
  "summary": "Comprehensive analysis of Kalshi's market performance",
  "date": "2025-02-06",
  "tags": ["analysis", "markets", "data"],
  "author": "Connor McDonald"
}
```

**article.md:**
```markdown
# Kalshi Market Analysis 2025

## Volume Trends

Trading volume has grown significantly:

```chart
@include figures/quarterly_volume.json
```

Sports markets, introduced in Q4 2024, now represent 45% of total volume.

## Market Breakdown

```chart
@include figures/market_breakdown.json
```

The data shows clear dominance in sports and election markets.
```

**figures/quarterly_volume.json:**
```json
{
  "type": "bar",
  "title": "Kalshi Quarterly Volume",
  "description": "Trading volume by quarter in millions USD",
  "data": [
    { "quarter": "Q1 2024", "volume": 15.2 },
    { "quarter": "Q2 2024", "volume": 28.5 },
    { "quarter": "Q3 2024", "volume": 45.8 },
    { "quarter": "Q4 2024", "volume": 62.3 },
    { "quarter": "Q1 2025", "volume": 95.7 }
  ],
  "xAxis": "quarter",
  "yAxis": "volume"
}
```

**figures/market_breakdown.json:**
```json
{
  "type": "pie",
  "title": "Market Share by Category",
  "data": [
    { "name": "Sports", "value": 45 },
    { "name": "Elections", "value": 30 },
    { "name": "Economics", "value": 15 },
    { "name": "Other", "value": 10 }
  ]
}
```

## Benefits

✅ **Cleaner markdown** - No large JSON blocks in your article
✅ **Reusable data** - Share chart data across multiple articles
✅ **Version control** - Track chart data changes separately
✅ **Easier editing** - Edit complex chart data without touching markdown
✅ **Better organization** - Keep figures in dedicated folder

## Tips

1. **Name files descriptively**: `quarterly_volume.json` not `chart1.json`
2. **Keep in figures folder**: Consistent structure across articles
3. **Include chart type**: Always specify `"type"` in the JSON
4. **Validate JSON**: Check syntax before committing
5. **Test locally**: Use online JSON validators if needed

## Error Handling

If a chart file is not found, you'll see an error message in the rendered article:

```
Chart Error: Failed to load figures/chart.json
File not found
```

Check:
- File path is correct
- File is in the article's directory
- JSON syntax is valid
- File is committed and pushed to GitHub
