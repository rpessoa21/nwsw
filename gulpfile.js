var gulp        = require('gulp'),
	pug         = require('gulp-pug'),
	browserSync = require('browser-sync'),
	stylus      = require('gulp-stylus'),
	prefix      = require('autoprefixer-stylus'),
	uglify      = require('gulp-uglify'),
	concat      = require('gulp-concat'),
	reload      = browserSync.reload;


function swallowError (error) {
	console.log(error.toString())
	this.emit('end')
}

// ================================
// JADE
// ================================
gulp.task('templates', function() {

	return gulp.src(['./assets/pug/**/*.pug', '!./assets/layout.pug'])
		.pipe(pug({
			data: {
				// baseHref: "/",
				baseHref: "https://github.com/rpessoa21/nwsw/blob/master/static/",
				links: [
					{
						'label': 'Home',
						'url': '/index.html#home'
					},
					{
						'label': 'Quem somos',
						'url': '/#about'
					},
					{
						'label': 'Serviços',
						'url': '/servicos/network'
					},
					{
						'label': 'Contacto',
						'url': '/#contacto'
					},
				],
				message: 'Hello World!'
			},
			// pretty: true
		}))
		.on('error', swallowError)
		.pipe(gulp.dest('./static/'));
});

/**
 * Important!!
 * Separate task for the reaction to `.jade` files
 */
gulp.task('jade-watch', ['templates'], reload);

// ================================
// STYLUS
// ================================
gulp.task('css', function() {
	return gulp.src(['./assets/stylus/style.styl'])
		.pipe(stylus({
			use: prefix(),
			compress: true
			// linenos: true
		}))
		.on('error', swallowError)
		.pipe(gulp.dest('./static/css'))
		.pipe(browserSync.reload({stream: true}));
});

// ================================
// UGLIFY
// ================================
gulp.task('js', function() {
  return gulp.src('./assets/js/*.js')
	.pipe(uglify())
	.on('error', swallowError)
	.pipe(concat('main.min.js'))
	.pipe(gulp.dest('./static/js'))
	.pipe(browserSync.reload({stream: true}));
});

/**
 * Serve and watch the scss/jade files for changes
 */
gulp.task('default', ['js', 'css', 'templates'], function () {

	browserSync({server: './static'});

	gulp.watch('./assets/js/*.js', ['js']);
	gulp.watch('./assets/stylus/**/*.styl', ['css']);
	gulp.watch('./assets/**/*.pug', ['jade-watch']);
});