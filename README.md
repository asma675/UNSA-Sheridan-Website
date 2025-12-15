# UNSA Sheridan Website (Static)

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
