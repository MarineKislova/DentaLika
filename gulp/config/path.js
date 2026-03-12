import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./doPublish`; // папка сборки для публикации
const srcFolder = `./assets`; // папка с исходными файлами

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    json: `${buildFolder}/js/data/`,
    css: `${buildFolder}/css/`,
    icons: `${buildFolder}/icons/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    html: `${buildFolder}/`,
    ru: `${buildFolder}/ru/`,
    en: `${buildFolder}/en/`,
    files: `${buildFolder}/files/`,
    other: `${buildFolder}/`,
  },
  src: {
    js: `${srcFolder}/js/app.js`,
    json: `${srcFolder}/js/data/**/*.json`,
    scss: `${srcFolder}/scss/style.scss`,
    icons: `${srcFolder}/icons/**/*.svg`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,mp4}`,
    svg: `${srcFolder}/img/**/*.svg`,
    html: `${srcFolder}/*.html`, //.pug
    ru: `${srcFolder}/ru/*.html`, //.pug
    en: `${srcFolder}/en/*.html`, //.pug
    files: `${srcFolder}/files/**/*.*`,
    other: `${srcFolder}/*.{php,txt,xml}`,
    svgicons: `${srcFolder}/icons/*.svg`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    json: `${srcFolder}/js/data/`,
    scss: `${srcFolder}/scss/**/*.scss`,
    icons: `${srcFolder}/icons/**/*.svg`,
    images: `${srcFolder}img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
    html: `${srcFolder}/**/*.html`, //.pug
    ru: `${srcFolder}/**/*.html`, //.pug
    en: `${srcFolder}/**/*.html`, //.pug
    files: `${srcFolder}/files/**/*.*`,
    other: `${srcFolder}/*.{php,txt,xml}`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  swiperCss: "node_modules/swiper/swiper-bundle.min.css",
  swiperJs: "node_modules/swiper/swiper-bundle.min.js",
  ftp: `test`, // ваш FTP-адрес, заполняем в самый последний момент при наличии FTP-сервера
};
