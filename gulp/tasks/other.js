export const other = () => {
    return app.gulp
       .src(app.path.src.other)
       .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "OTHER",
          message: "Error: <%= error.message %>",
        })
      )
    )
       .pipe(app.gulp.dest(app.path.build.other))
       .pipe(app.plugins.browserSync.stream()); //обновление браузера при изменении файла
}