# Dessau Modul — website

Single-page marketing site for **Dessau Modul**, modular interiors made in Pune at our own factories (Manjri since 2016, Kasurdi MIDC since 2022).

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

Hosted on GitHub Pages from the `claude/dessau-modul-website-0z33cm` branch (repository root). Every push to that branch updates the live site within a minute or two.

- Main address: `https://www.dessaumodul.com` (set in the `CNAME` file)
- `dessaumodul.com` redirects to `www` automatically once its A records point to GitHub
- `dessaumodul.in` is forwarded to `https://www.dessaumodul.com` from GoDaddy
- `.nojekyll` tells GitHub to serve the files as-is

DNS lives at GoDaddy. Only the website records (`A @` and `CNAME www`) point to GitHub. Leave the email (`MX`, `TXT`) records alone.

## Before going live

- **Enquiry form:** submissions are emailed to `info@dessaumodul.com` through [FormSubmit](https://formsubmit.co) (set in `js/main.js`). The very first submission sends an activation email to that inbox; click the link once and every later enquiry arrives as an email.
- **Photos:** the current photos come from the AID Woods company profile. Swap in your own project photos by replacing the files in `assets/img/` and keeping the same file names.
