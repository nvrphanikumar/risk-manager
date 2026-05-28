# Quantum Risk Manager Dashboard

A premium, interactive portfolio risk assessment dashboard designed for active stock and crypto traders who work full-time jobs. This client-side web application parses portfolio CSV data, identifies critical stop-loss breaches, evaluates diversification, aggregates news sentiment, and runs stressful market scenarios to support rapid decision-making.

## Key Features

1. **AI Risk Manager's Daily Action Items**: An inbox highlighting critical operations:
   - 🚨 **Critical Sell**: Triggered when a position's current price breaches its trailing stop loss.
   - ⚠️ **Reduce Size**: Warning when a single symbol exceeds a 15% portfolio weight or when a sector exceeds 25% exposure.
   - 📈 **Buy Opportunity**: Accumulation advice when a winning position is under-allocated relative to its "Ideal Shares".
2. **Stress Test Simulator**: Drag sliders to simulate market drops (beta-weighted) or specific sector corrections. The simulator will immediately calculate the new portfolio valuation and count how many of your trailing stops would be triggered.
3. **Advanced Positions Analyzer**: A rich, filterable grid displaying shares, average cost, current price, trailing stops, absolute and percentage return, size, and real-time status. Filterable by account, sector, and risk status.
4. **Holdings-Specific News Hub**: Dynamically pulls and generates news headlines mapped directly to the active holdings in your portfolio. Shows sentiment indicators (Bullish, Bearish, Neutral) matching performance.

## Sizing & Sizing Recommendations Logic

The Risk Manager enforces two key constraints:
* **Symbol Concentration Limit**: 15% of total portfolio value. Any holding exceeding 15% triggers a size reduction advice.
* **Sector Exposure Limit**: 25% of total portfolio value. Any sector exceeding 25% triggers a warning to halt accumulation in that sector.
* **Accumulation (Buy) Signals**: Triggered if a position has positive return (> 10%), current shares are below "Ideal Shares" (from column `Ideal Shares` in the CSV), and has no active stop warnings.

## Running the Dashboard

### Option A: Direct Google Sheets Sync (Recommended)
You can link your live Google Sheet directly to the dashboard so it always loads your latest positions:
1. Open your Google Sheet containing the portfolio data.
2. Go to **File** > **Share** > **Publish to Web**.
3. In the dropdown, select the specific tab (or Entire Document) and change **Web Page** to **Comma-separated values (.csv)**.
4. Click **Publish** and copy the generated link.
5. Open [index.html](index.html) and paste the link into the **Sync Google Sheet Directly** box.
6. Once synced, a **Sync Google Sheet** button will appear in the top-right header, allowing you to update your dashboard at any time with a single click.

### Option B: Drag-and-Drop CSV (Zero Setup)
1. Double-click the [index.html](index.html) file to open it directly in any modern browser.
2. Drag and drop your `Positions - Portfolio.csv` file into the dashed box (or click it to browse and upload).
3. The dashboard will cache the data locally in your browser (`localStorage`), so it remains available next time you open the page.

### Option C: Local Web Server (Auto-loads CSV)
If you run a local web server in this directory, the dashboard will attempt to load the `Positions - Portfolio.csv` file automatically.
For example, using Python:
```bash
python -m http.server 8000
```
Or using Node.js:
```bash
npx http-server
```
Then open `http://localhost:8000` in your web browser.
