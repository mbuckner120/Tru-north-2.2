# True North v2.2 — Logistics Hub (PWA Prototype)

This is a **mobile-first, offline-capable** prototype that runs fully in your phone's browser. No server required.
It stores data on-device using `localStorage`. You can install it to your home screen like an app.

## Quick Start
1. Unzip the folder.
2. Open `index.html` **from a local web server** (recommended) or a mobile file-server app.
   - On desktop: from the unzipped folder, run a simple server like `python -m http.server 8080` and visit `http://localhost:8080` on your phone (same Wi‑Fi).
   - Or upload the folder to any static host (Netlify, GitHub Pages, local NAS) and open the URL on your phone.
3. Tap the browser menu and **Add to Home Screen** to install the PWA.

> Note: Opening `index.html` directly with a `file://` URL may block the service worker in some browsers. Use a tiny local server for best results.

## Features
- **Request Form** with dynamic follow-ups by category (Clothing, Food, Toiletries, School Supplies, Household, Other).
- **Donation Form** with item, quantity, and **Fair Market Value** per item.
- **Receipts**: Generates a plain‑text receipt you can download.
- **Dashboard** with filters, quick “Mark Fulfilled,” and CSV export.
- **No Internet Needed** after first load (cached by service worker).

## Legal Note (CA, no 501(c)(3))
- Donors don’t get a tax deduction, but **participating businesses** can offer private promotional discounts for donors who show a True North receipt.
- Keep it framed as a **marketing promotion**, not a charitable write‑off. (Consult counsel before public rollout.)

## Reset / Clear Data
Because data is stored in the browser, you can clear it by removing site data in your browser settings.

## Next Steps
- Swap `localStorage` for IndexedDB for larger datasets.
- Add optional QR on receipts and a partner portal for discount validation.
- Add simple matching suggestions (e.g., recommend donors to open requests by tag).