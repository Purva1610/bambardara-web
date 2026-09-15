# Bambardara Agrotourism — MD Dashboard (React)

A React + Vite + Tailwind + Recharts rebuild of the MD dashboard mockup.
7 pages (Overview, Capital & Investment, Club Membership, Business
Divisions, Facilities Status, Bookings & Events, Leadership), plus
interactive functionality layered on top of the original static mockup.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## What's new since the first version

- **Drill-down modals** — click any row in the investment tier table,
  membership tier table, or facilities grid, or click any upcoming event,
  to see extra sample detail (investor list, member list, contractor
  info, booking contact) in a popup.
- **Resolvable attention items** — on Overview, check off an item in
  "Needs MD attention" to mark it resolved (strikes through, greys out,
  the open/resolved count updates). State resets on page reload since
  there's no backend yet — see "Where the real data goes" below.
- **CSV export** — "Export CSV" buttons on the Capital & Investment and
  Club Membership pages download the current table as a `.csv` file,
  ready to open in Excel or Google Sheets.
- **Search & filter** — Facilities and Business Divisions pages have a
  live search box that filters the grid as you type.
- **Last updated timestamp** — shown in the top bar on every page, next
  to the director's name.

## Project structure

```
src/
├── App.jsx                entry component, holds the active-page state
├── main.jsx                React root
├── index.css                Tailwind directives
├── data.js                  all placeholder data + drill-down detail
├── utils/
│   └── csv.js                 downloadCSV() helper used by export buttons
├── components/
│   ├── Sidebar.jsx             left nav, calls onNavigate(pageKey)
│   ├── Topbar.jsx               page title + subtitle + last-updated
│   ├── Modal.jsx                 generic drill-down popup
│   └── Ui.jsx                     Card, SectionHead, Pill, Dot,
│                                   SearchInput, ExportButton
└── pages/
    ├── Overview.jsx        KPI cards, trend chart, resolvable attention list
    ├── Capital.jsx          investment tier chart + table + drill-down + CSV
    ├── Membership.jsx        club membership table + drill-down + CSV
    ├── Divisions.jsx           10 business divisions grid + search
    ├── Facilities.jsx           17 facilities + search + drill-down
    ├── Events.jsx                 bookings + revenue pie + drill-down
    └── Leadership.jsx              director bios
```

## Where the real data goes

Everything in `src/data.js` is placeholder, including the sample
investor/member lists and facility/event detail used by the drill-down
modals. Swap each export for a real fetch (from your CRM, accounts
system, or a simple API) when you're ready to make this live — the
page components render whatever `data.js` provides, so they don't need
to change structurally.

The "resolved" checkbox state and any future edits currently live only
in React state (`useState` in `Overview.jsx`) and are lost on refresh.
To persist them you'd need one of:
- A backend (write the resolved flag back to your database)
- `localStorage` (quick, but only persists on that one browser/device)
- A lightweight sync layer (Firebase, Supabase, etc.)

## Still frontend-only

There's still no backend, authentication, or persistence — this is a
richer static mockup, not a production app. Natural next steps:
login/access control, a real data source, notifications, and PDF/report
export were all discussed but aren't implemented yet.

## Notes

- Tailwind uses arbitrary hex values for the brand palette (forest green +
  gold), configured in `tailwind.config.js` as named colors
  (`forest`, `gold`, `cream`, etc.).
- Charts are built with [Recharts](https://recharts.org).
