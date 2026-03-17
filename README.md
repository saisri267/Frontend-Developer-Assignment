# LogiX — Logistics Order Creation Dashboard

A modern, production-grade logistics order creation interface built with **Next.js 14 App Router**, **React hooks**, and **CSS Modules only**.

## Features

- 📦 Multi-package shipment creation
- ⚡ Live preview panel updating in real time
- 🚚 Standard / Express delivery type selection
- 🗂️ Add / remove packages dynamically
- 🔴 Fragile & 🟢 Insurance flags
- 📱 Fully responsive (desktop → tablet → mobile)
- ♿ Accessible — semantic HTML, labels, ARIA roles

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | JavaScript (ES6+) |
| State | React `useState` / `useCallback` |
| Styling | **CSS Modules only** |
| Fonts | DM Sans + DM Mono (Google Fonts) |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
logistics-dashboard/
├── app/
│   ├── layout.jsx          # Root layout + font imports
│   ├── page.jsx            # Main page — state owner
│   └── globals.css         # Minimal CSS reset only
├── components/
│   ├── OrderForm.jsx        # Full order creation form
│   ├── ShipmentPreview.jsx  # Live preview panel
│   ├── PackageList.jsx      # Package list manager
│   ├── PackageItem.jsx      # Individual editable package row
│   ├── FormSection.jsx      # Labelled section wrapper
│   └── Badge.jsx            # Status badge component
├── styles/
│   ├── Layout.module.css    # Page layout, header, grid
│   ├── OrderForm.module.css # Form inputs, delivery toggle, checkboxes
│   ├── Preview.module.css   # Preview card, route, package cards
│   ├── Package.module.css   # Package item editing UI
│   ├── FormSection.module.css
│   └── Badge.module.css
└── utils/
    ├── generateOrderId.js   # Auto order ID generator
    └── calculateTotals.js   # Shipment totals + INR formatter
```

## Build for Production

```bash
npm run build
npm start
```
