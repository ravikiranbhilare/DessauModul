# Dessau Modul — website

Single-page marketing site for **Dessau Modul**, modular interiors in Pune, manufactured by AID Woods (our lifelong manufacturing partner).

It's plain static HTML, CSS and JS, with no build step.

```
index.html        page markup and all copy
css/styles.css    design tokens (brand colours from the logo) and layout
js/main.js        mobile menu, gallery filter and lightbox, scroll reveals, enquiry form
assets/img/       optimised WebP photos, plus og-image.jpg (logo for link previews)
assets/favicon.svg
```

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Upload the folder as-is to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, or plain cPanel hosting).

## Before going live

- **Phone number:** replace `+91 98XXX XXXXX` and `tel:+9198XXXXXXXX` in `index.html`.
- **Showroom address:** replace "Kharadi, Pune (address to follow)".
- **Enquiry form:** it currently opens the visitor's email app, addressed to `hello@dessaumodul.com`. To receive submissions directly, point the form at a service such as Formspree or Web3Forms, or at a WhatsApp link.
- **Photos:** the current photos come from the AID Woods company profile. Swap in your own project photos by replacing the files in `assets/img/` and keeping the same file names.
