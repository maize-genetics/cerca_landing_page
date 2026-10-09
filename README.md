# CERCA Landing Page

Static marketing/landing site for the CERCA initiative. Built with plain HTML, CSS, and vanilla JavaScript 
(no build step) and deployed via GitHub Pages.


## Local preview

There is no build step. To see the site on your computer, run this in the
project folder:

```bash
npx serve .
```

Then open <http://localhost:3000/>.

You need [Node.js](https://nodejs.org/) installed to use `npx`.

Page links do not end in `.html` (for example, `/contact` instead of
`/contact.html`). `npx serve` handles these links the same way GitHub Pages
does. Other servers, like `python3 -m http.server`, do not, so links between
pages will break. Opening the HTML files straight from your file browser will
also break the links.


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


