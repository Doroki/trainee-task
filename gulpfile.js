const gulp = require("gulp"),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    runSequence = require('run-sequence'),
    webpack = require("webpack");


/*=============================================
=                gulp "default"               =
=============================================*/


gulp.task('es6', function(done) {
    webpack({
      entry: './src/js/index.js',
      output: {
        path: __dirname + '/src/js/compiled',
        filename: 'bundle.js'
      },
      devtool: 'source-map',
      module: {
		rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env'],
                            plugins: ["transform-object-rest-spread"]
                        }
                    }
                }
            ]
        }
    },function (err, stats) {
        if (err) throw err;
        console.log(stats.toString());
        done();
    });
});


gulp.task("css", function(){
    return gulp.src("src/scss/main.scss")
        .pipe(plumber())
        .pipe(sass.sync())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest("src/css/"))
        .pipe(browserSync.stream());
});


gulp.task("browser-sync", function() {
    browserSync.init({
        server: "src/"
    });
});


gulp.task("watch", function(){
    gulp.watch("src/scss/**/*.scss", ["css"]);
    gulp.watch("src/js/*.js", ["es6"]);
    gulp.watch(["src/*.html", "src/js/compiled/*.js"], browserSync.reload);
});


gulp.task("default", ["es6", "css", "browser-sync", "watch"]);

/*=====  End of gulp "default"  ======*/



/*=============================================
=            gulp "dist"            =
=============================================*/

gulp.task("clean", function(){
    return del("dist/");
});



gulp.task("copy", function(){
    gulp.src(["src/*.html"], {base: "src"})
    .pipe(gulp.dest("dist/"));
    gulp.src(["src/css/**/*.css"], {base: "src"})
    .pipe(gulp.dest("dist/"));
    gulp.src(["src/js/compiled/*.js"], {base: "src"})
    .pipe(gulp.dest("dist/"));
    gulp.src(["src/*.json"], {base: "src"})
    .pipe(gulp.dest("dist/"));
});


gulp.task("dist", function(){
    runSequence("clean", "copy");
});

/*=====  End of gulp "distribution"  ======*/
