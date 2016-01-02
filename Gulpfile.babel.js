import gulp from 'gulp';
import watch from 'gulp-watch';
import gutil from 'gulp-util';
import eslint from 'gulp-eslint';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sassdoc from 'sassdoc';
import ghpages from 'gulp-gh-pages';
import stringify from 'stringify';

const SRC = './src';
const EXAMPLE_SRC = './example';
const DIST = './dist';
const EXAMPLE_DIST = './distExample';
const SCSS = '/scss';
const JS = '/js';

const PROD_CONFIG = {
  sass: { outputStyle: 'compressed' },
  browserify: {},
};

const DEV_CONFIG = {
  sass: { outputStyle: 'expanded', sourceMap: true },
  browserify: { debug: true },
};

// =============================================
// Gulp tasks


function styles(source, dist, isProd, isServer) {
  const config = isProd ? PROD_CONFIG : DEV_CONFIG;

  return gulp.src(source)
    .pipe(sass(config.sass))
    .on('error', function(err) {
      gutil.log(gutil.colors.red('ERROR'), err.message);
      this.emit('end');
    })
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 version'],
      }),
    ]))
    .pipe(isProd ? rename({ suffix: '.min' }) : gutil.noop())
    .pipe(isServer ? sourcemaps.init({ loadMaps: true }) : gutil.noop())
    .pipe(isServer ? sourcemaps.write('./') : gutil.noop())
    .pipe(gulp.dest(dist))
    .pipe(isServer ? browserSync.stream() : gutil.noop());
}

function lint(src, isProd) {
  return gulp.src(`${src}/**/*.js`)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(isProd ? eslint.failOnError() : gutil.noop());
}

function scripts(isProd) {
  return gulp.src(SRC + JS + '/**/*.js')
    .pipe(babel())
    .pipe(isProd ? uglify() : gutil.noop())
    .pipe(isProd ? rename({ suffix: '.min' }) : gutil.noop())
    .pipe(gulp.dest(DIST));
}


gulp.task('clean', (callback) => {
  return del(EXAMPLE_DIST, callback);
});


gulp.task('styles', () => {
  const source = `${SRC}${SCSS}/react-dd-menu.scss`;

  styles(source, DIST, false, false);
  return styles(source, DIST, true, false);
});


gulp.task('sassdoc', () => {
  return gulp.src(`${SRC}/${SCSS}/**/*.scss`).pipe(sassdoc({ dest: `${EXAMPLE_DIST}/sassdoc` }));
});
gulp.task('sassdoc:watch', ['sassdoc'], browserSync.reload);


gulp.task('lint', () => {
  return lint(SRC);
});

gulp.task('scripts', ['lint'], () => {
  scripts(false);
  return scripts(true);
});

gulp.task('dist', ['clean', 'styles', 'scripts']);

gulp.task('default', ['dist']);


function bundle(isProd) {
  const config = isProd ? PROD_CONFIG : DEV_CONFIG;
  const bundle = browserify(config.browserify);
  bundle.add(EXAMPLE_SRC + JS + '/index.js');
  bundle.transform(babelify);
  bundle.transform(stringify(['.txt']));

  return bundle.bundle()
    .on('error', function(err) {
      gutil.log(gutil.colors.red('ERROR'), err.message);
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(EXAMPLE_DIST));
}

gulp.task('statics:example', () => {
  gulp.src(`${EXAMPLE_SRC}/index.html`).pipe(gulp.dest(EXAMPLE_DIST));
});

gulp.task('styles:example', () => {
  return styles(`${EXAMPLE_SRC}${SCSS}/main.scss`, EXAMPLE_DIST, false, true);
});
gulp.task('styles-watch:example', ['styles:example']);

gulp.task('scripts:example', () => {
  return bundle(false);
});
gulp.task('scripts-watch:example', ['scripts:example'], browserSync.reload);

gulp.task('dist:example', ['styles:example', 'scripts:example', 'statics:example', 'sassdoc']);
gulp.task('serve', ['dist:example'], () => {
  browserSync({
    server: {
      baseDir: EXAMPLE_DIST,
    },
  });

  watch('./+(src|example)/**/*.+(js|jsx)', () => {
    gulp.start('scripts-watch:example');
  });
  watch('./+(src|example)/**/*.scss', () => {
    gulp.start('styles-watch:example');
  });
});

gulp.task('scripts:deploy', () => {
  return bundle(true);
});

gulp.task('deploy', ['scripts:deploy', 'styles:example', 'statics:example', 'sassdoc'], () => {
  return gulp.src(`${EXAMPLE_DIST}/**/*`).pipe(ghpages());
});
