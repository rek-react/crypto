import webpack from 'webpack-stream'

export const scripts = () => {
    return app.gulp.src(app.path.src.scripts, { sourcemap: app.isDev })
        .pipe(webpack({
            mode: app.isDev ? 'development' : 'production',
            output: {
                filename: 'script.min.js'
            }
        }))
        .pipe(app.gulp.dest(app.path.build.scripts))
        .pipe(app.plugins.browserSync.stream())
}