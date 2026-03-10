export const copySwiperCss = () => {
  return app.gulp.src(app.path.swiperCss).pipe(app.gulp.dest(app.path.build.css));
};

export const copySwiperJs = () => {
  return app.gulp.src(app.path.swiperJs).pipe(app.gulp.dest(app.path.build.js));
};
