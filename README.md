# UNSA Sheridan Website (Static)

This is a lightweight, **static** multi-page website (no frameworks) with a light-blue glow theme inspired by your logo.

## Pages included
- `index.html` (Home)
- `about.html`
- `events.html` (filter + countdown)
- `team.html`
- `goals.html`
- `join.html` (email-based join flow)
- `resources.html`
- `contact.html`

## Run locally
Just open `index.html` in a browser, or use VS Code Live Server.

## Customize quickly
- Update the logo: `assets/logo.png`
- Update your club email:
  - `join.html` `data-club-email="..."` and `contact.html`
- Update events:
  - edit rows in `events.html` (use `data-date="YYYY-MM-DD"`)

## Deploy free (GitHub Pages)
1. Create a GitHub repo, e.g. `unsa-sheridan-site`
2. Upload all files from this folder
3. In GitHub: Settings → Pages → Deploy from branch → `main` / root
4. Your site will appear at a GitHub Pages URL.

(You can also use Netlify: drag-and-drop the folder.)

---

If you want, I can also:
- add a Sponsors page
- add an FAQ page
- add a photo gallery
- add a “Register” button per event (Google Form links)
