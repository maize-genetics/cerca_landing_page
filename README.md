# CERCA Landing Page

Static marketing/landing site for the CERCA initiative. Built with plain HTML, CSS, and vanilla JavaScript 
(no build step) and deployed via GitHub Pages.


## Local preview

No build is required. Serve the folder with any static file server, for example:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/>.


## Contact form configuration

The contact form on `contact.html` builds a `mailto:` link to a recipient
address read at runtime from `window.CERCA_CONTACT_EMAIL`. The real address is
kept out of source control.

### Local development

If you need to test out the contact form, you will need to run the following 
command and edit your personal `cerca-config.js`:

```bash
cp js/cerca-config.example.js js/cerca-config.js
# then edit js/cerca-config.js and set window.CERCA_CONTACT_EMAIL
```


