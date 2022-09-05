export const copy = () => {
    return app.gulp.src(app.path.src.icon)
        .pipe(app.gulp.dest(app.path.build.icon))
}