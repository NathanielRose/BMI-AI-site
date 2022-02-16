const fs = require("fs");
const favicons = require("favicons");

const source = "src/static/img/favicon/favicon-new.png";
const faviconsPath = "src/static/img/favicon/";
const faviconsHtmlPath = "src/_layouts/_favicons.njk";

const configuration = {
  path: "/assets/favicons",
  appName: "lymbic.ai",
  appShortName: null,
  appDescription: null,
  developerName: "nrose",
  developerURL: "naterose.io",
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