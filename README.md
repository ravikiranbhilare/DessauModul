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

Hosted on Netlify, which deploys automatically from this repository on every push (`netlify.toml` holds the settings).

- Main address: `https://www.dessaumodul.com`
- `dessaumodul.com` redirects to `www` (set in `netlify.toml`)
- `dessaumodul.in` is forwarded to `https://www.dessaumodul.com` from GoDaddy

DNS lives at GoDaddy. Only the website records (`A @` and `CNAME www`) point to Netlify. Leave the email (`MX`, `TXT`) records alone.

## Before going live

- **Enquiry form:** it currently opens the visitor's email app, addressed to `ravi@dessaumodul.com`. To receive submissions directly, point the form at a service such as Formspree or Web3Forms, or at a WhatsApp link.
- **Photos:** the current photos come from the AID Woods company profile. Swap in your own project photos by replacing the files in `assets/img/` and keeping the same file names.
