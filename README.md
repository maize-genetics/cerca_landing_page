# CERCA Landing Page

Static marketing/landing site for the CERCA initiative. Built with plain HTML, CSS, and vanilla JavaScript (no build step) and deployed via GitHub Pages.

## Pages

- `index.html` — Home / About
- `impact.html` — Impact
- `science.html` — The Science Behind
- `contact.html` — Connect / Contact

## Project structure

```
.
├── index.html
├── impact.html
├── science.html
├── contact.html
├── css/
│   ├── cerca-base.css        # resets, layout primitives, parallax backgrounds
│   ├── cerca-components.css   # shared components (nav, buttons, cards, footer)
│   └── cerca-pages.css        # page-specific styles
├── js/
│   ├── cerca-global.js        # shared behavior (nav, partner carousel, reveal animations)
│   └── cerca-home.js          # home-page specific behavior
├── images/                    # all image, animated-webp, and video assets
├── .nojekyll                  # serve files verbatim (skip Jekyll processing)
└── .gitignore
```

## Local preview

No build is required. Serve the folder with any static file server, for example:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/>.

## Deploying to GitHub Pages

This repo is published as a project site at
`https://maize-genetics.github.io/cerca_landing_page/`.

1. Commit and push to the `main` branch.
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** = "Deploy from a branch".
4. Set **Branch** = `main` and folder = `/ (root)`, then **Save**.
5. Wait for the deployment to finish; the site will be live at the URL above.

All asset paths are relative (`images/...`, `css/...`, `js/...`), so the site works correctly from the project-page subpath.

## Notes

- GitHub Pages is served from Linux and is case-sensitive: asset filenames and their references must match exactly.
- Large hero/section animations are stored as animated WebP; the about-page clip is an H.264 MP4.
