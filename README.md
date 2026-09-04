<<<<<<< HEAD
# Hollowmere Executive Dashboard

A premium CEO / executive control-center UI for a luxury estate & resort company — React, Tailwind, React Router, Lucide, Framer Motion, and Recharts.

## 1. Install dependencies

```bash
npm install react-router-dom framer-motion lucide-react recharts
```

If Tailwind isn't already configured in your project:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 2. Copy files in

```
tailwind.config.js        → project root (merge with your existing config if you have one)
src/index.css             → src/index.css (merge the :root/.dark variables + @layer if you already have global styles)
src/main.jsx               → src/main.jsx (or copy the Router/ThemeProvider wiring into your existing entry file)
src/App.jsx                → src/App.jsx (or merge these <Route> entries into your existing router)
src/context/                → src/context/
src/layouts/                → src/layouts/
src/components/             → src/components/
src/pages/                   → src/pages/
src/lib/                      → src/lib/
```

## 3. What's included

- **Sidebar** — compact, fixed on desktop, slide-in drawer with overlay on mobile. All 12 sections routed, subtle forest-green active state.
- **Navbar** — breadcrumb title + date subtitle, a working date-range dropdown (Last 7 Days / Last 30 Days / This Quarter / Year to Date), search, notifications, and the CEO profile menu.
- **ProfileDropdown** — My Profile, Account Settings, Notifications, an inline Appearance switcher (Light/Dark/System + accent color), and Logout. Theme persists to `localStorage`.
- **Executive header** — "Good morning" greeting, today's date, and a Download Report button that produces a real file download (wire it to your reporting endpoint).
- **6 KPI cards** — Revenue, Bookings, Occupancy, ADR, Guests, Net Profit, each with a change indicator.
- **Revenue Performance** — an interactive area chart with Revenue / Bookings / Profit filters and a dashed previous-year comparison line.
- **Business Performance** — three ring-gauge metrics (Occupancy, Revenue Growth, Profit Margin).
- **Booking Overview** — a donut chart of Confirmed / Pending / Cancelled with a legend.
- **Revenue by Business Area** — a horizontal bar chart across Residences, Dining, Experiences, Events, Other.
- **Residence Performance** — a table (cards on mobile) with occupancy bars and performance badges.
- **Guest Insights** — total/new/returning guests, satisfaction rate, and a small trend sparkline.
- **Executive Alerts** — calm, non-alarming signal list with positive/caution/neutral tones.
- **Recent High-Value Bookings** — the top-value reservations, table on desktop, cards on mobile.
- **Quick Executive Actions** — four buttons routed to Finance, Bookings, Performance, and a report download.
- **Recent Executive Activity** — a compact timeline.
- **Footer** — small copyright line.
- Every remaining sidebar destination (Business Performance, Residences, Guests, Experiences, Dining, Events, Finance, Reports, Team Performance) is wired to a real route with a placeholder page, so all navigation works while you build out the detail views.

## 4. Design tokens

Colors live as CSS variables in `src/index.css` (`--color-primary`, `--color-accent`, etc.) and are surfaced through Tailwind in `tailwind.config.js`. The palette matches the brief exactly: forest green (#123F3A), dark forest (#0B2E2A), secondary green (#2F6258), ivory background (#F4F3EE), white cards, and a muted gold accent (#B8A77A). Corners are kept tighter and shadows softer than a typical SaaS admin panel, in line with an executive rather than CRUD-heavy feel.
=======
﻿# Bambardara-web
>>>>>>> 10970a82d09de78b1c67f420c129bcca18ea10b2
