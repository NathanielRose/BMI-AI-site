# 11ty-landing-page

A simple landing page built with 11ty and Tailwind CSS.

> Port of the [Hugo Version](https://github.com/ttntm/hugo-landing-page)

## How to use this template

**Requirements:**

1. Eleventy (developed and tested with version 0.12.1)
2. Tailwind CSS

All other dependencies are either linked from a CDN or included in this repository.

**Setup:**

1. Fork, clone or download
2. `cd` into the root folder
3. run `npm install`
4. run `npm run serve`
5. open a browser and go to `http://localhost:8080`

# 1,33,100,

**Basic configuration:**

1. Eleventy -> `./.eleventy.js`
2. Tailwind -> `./tailwind.config.js`
3. Netlify -> `./netlify.toml`

CSS is built via PostCSS and based on `./src/_includes/css/_page.css`. Building CSS gets triggered by `./src/css/page.11ty.js` and Tailwind's config is set to JIT (see: [Tailwind docs](https://tailwindcss.com/docs/just-in-time-mode))

Please note that this CSS build _does not_ include the `normalize.css` file used for the 2 regular pages (imprint, privacy) - a minified production version is stored in `./src/static/css` and gets included in the build by default.

**Change Content:**

Page content is stored in

- `./src/`
  - `imprint.md`
  - `privacy.md`
- `./src/sections/`
- `./src/_data/features.json`

**Change Templates/Layout:**

Page structure and templates are stored in `./src/_layouts/` and can be edited there.

Best have a look at `./layouts/base.njk` first to understand how it all comes together - the page itself is constructed from partial templates stored in `./src/includes/` and each section has a corresponding template file (`section.**.njk`) stored there.

`index.njk` in `./src/` arranges everything, meaning that sections can be added/re-ordered/removed/... there.

**Change images:**

Images are stored in `./static/img/`; everything in there can be considered a placeholder that should eventually be replaced with your actual production images.
'# Page header' 


## Favicons

Let's generate favicons.

```
npm install favicons --save
The script requires three variables:
```

a path to an image from which we want to generate favicons
a path to a directory where we want to store all files
a path to a directory where we want to save the HTML meta tags
The script is straightforward. I keep it inside _scripts directory.

```
const fs = require("fs");
const favicons = require("favicons");

const source = "content/images/eshlox.jpg";
const faviconsPath = "_assets/favicons/";
const faviconsHtmlPath = "_layouts/_favicons.njk";

const configuration = {
  path: "/assets/favicons",
  appName: "eshlox.net",
  appShortName: null,
  appDescription: null,
  developerName: "eshlox",
  developerURL: "https://eshlox.net",
  dir: "auto",
  lang: "en-US",
  background: "#fafafa",
  theme_color: "#111111",
  appleStatusBarStyle: "black-translucent",
  display: "standalone",
  orientation: "any",
  scope: "/",
  start_url: "/",
  version: "1.0",
  logging: false,
  pixel_art: false,
  loadManifestWithCredentials: false,
  icons: {
    android: true,
    appleIcon: false,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    windows: false,
    yandex: true,
  },
};

const callback = function (error, response) {
  if (error) {
    console.log(error.message);
    return;
  }

  if (!fs.existsSync(faviconsPath)) {
    fs.mkdirSync(faviconsPath);
  }

  response.images.forEach((element) => {
    fs.writeFileSync(`${faviconsPath}/${element.name}`, element.contents);
  });

  response.files.forEach((element) => {
    fs.writeFileSync(`${faviconsPath}/${element.name}`, element.contents);
  });

  fs.writeFileSync(faviconsHtmlPath, response.html.join("\n"));
};

favicons(source, configuration, callback);
```

You can find the full documentation on Github so update the configuration to your needs. The script uses the favicons library, which does all the work and then creates a directory, saves all the images, all the files and the HTML in the given paths.

Every time I want to generate or update favicons, I have to run a single command and commit all the files to the repository.

```
node _scripts/generate_favicons.js
```
The _assets/favicons directory content:

```
tree _assets/favicons

_assets/favicons
├── android-chrome-144x144.png
├── android-chrome-192x192.png
├── android-chrome-256x256.png
├── android-chrome-36x36.png
├── android-chrome-384x384.png
├── android-chrome-48x48.png
├── android-chrome-512x512.png
├── android-chrome-72x72.png
├── android-chrome-96x96.png
├── favicon-16x16.png
├── favicon-32x32.png
├── favicon-48x48.png
├── favicon.ico
├── manifest.json
├── yandex-browser-50x50.png
└── yandex-browser-manifest.json

0 directories, 16 files
```
The `_layouts/_favicons.njk` file content:

```
<link rel="shortcut icon" href="/assets/favicons/favicon.ico" />
<link
  rel="icon"
  type="image/png"
  sizes="16x16"
  href="/assets/favicons/favicon-16x16.png"
/>
<link
  rel="icon"
  type="image/png"
  sizes="32x32"
  href="/assets/favicons/favicon-32x32.png"
/>
<link
  rel="icon"
  type="image/png"
  sizes="48x48"
  href="/assets/favicons/favicon-48x48.png"
/>
<link rel="manifest" href="/assets/favicons/manifest.json" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="theme-color" content="#111111" />
<meta name="application-name" content="eshlox.net" />
<link
  rel="yandex-tableau-widget"
  href="/assets/favicons/yandex-browser-manifest.json"
/>
```
That's all I need. I can easily include the `_layouts/_favicons.njk` file in my `_layouts/base.njk` to add favicons to all pages.

`{% include "./_favicons.njk" %}`