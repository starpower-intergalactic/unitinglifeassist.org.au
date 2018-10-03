var gulp       = require('gulp'),
	concat     = require('gulp-concat'),
	uglify     = require('gulp-uglify'),
	sass       = require('gulp-sass'),
	minifyCSS  = require('gulp-minify-css'),
	livereload = require('gulp-livereload'),
	stripDebug = require('gulp-strip-debug'),
	rename     = require('gulp-rename'),
	rjs        = require('requirejs');

gulp.task('default', ['js-production', 'sass', 'glossarizer-min', 'minify-iscroll'], function(){});

gulp.task('js-production', function(){
	gulp.src(['js/dev/**/*.js','!js/dev/wizard/**/*.js'])
		.pipe( uglify() )
		.pipe( stripDebug() )
		.pipe( concat('site.js') )
		.pipe( gulp.dest('js/build/') );
});

gulp.task('js', function(){
	gulp.src(['js/dev/**/*.js','!js/dev/wizard/**/*.js'])
		// .pipe( uglify() )
		// .pipe( stripDebug() )
		.pipe( concat('site.js') )
		.pipe( gulp.dest('js/build/') );
});

gulp.task('sass', function(){
	gulp.src(['scss/all.scss','scss/blocks.scss','scss/video-js.scss'])
		// .pipe( sass({ sourceComments : 'map', errLogToConsole : true }) )
		.pipe( sass({ errLogToConsole : true, outputStyle : 'expanded' }) )
		.pipe( minifyCSS() )
		.pipe( gulp.dest('css/') );
});

gulp.task('watcher', function(){
	gulp.watch('js/dev/**/*.js', ['js']);
	gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('livereload', function(){
	var server       = livereload(),
		filesToWatch = [
			'*.html',
			'css/all.css',
			'js/dev/wizard/**/*',
			'js/build/site.js'
		];
	
	gulp.watch(filesToWatch, function(file){
		server.changed( file.path );
	});
});

gulp.task('minify-iscroll', function(){
	gulp.src('js/libs/iscroll.js')
		.pipe( uglify() )
		.pipe( concat('iscroll.min.js') )
		.pipe( gulp.dest('js/libs/') );
});



gulp.task('wizardjs', function(){

	var config = {
		optimze : '',
		baseUrl : 'js/dev/wizard',
		name    : 'main',
		out     : 'js/build/wizard-pre.js',

		paths : {
			backbone              : '../../libs/backbone',
			'backbone.wreqr'      : '../../libs/backbone.wreqr',
			'backbone.babysitter' : '../../libs/backbone.babysitter',
			jquery                : 'empty:',
			marionette            : '../../libs/backbone.marionette.amd',
			tpl                   : '../../libs/tpl',
			underscore            : '../../libs/underscore'
		},
		shim : {
			backbone : {
				deps    : ['jquery'],
				exports : 'Backbone'
			},
			marionette : {
				deps    : ['backbone'],
				exports : 'Marionette'
			},
			underscore : {
				exports : '_'
			}
		}
	};

	rjs.optimize( config, function( buildReponse){
		console.log( 'RequireJS done!' );
	}, function( err ){
		console.log('Error compiling with RequireJS:', err );
	});
});

gulp.task('wizardjs-optimize-testing', ['wizardjs'], function(){

	gulp.src('js/build/wizard-pre.js')
		// .pipe( stripDebug() )
		.pipe( rename('wizard.js') )
		.pipe( gulp.dest('js/build/') );

});

gulp.task('wizardjs-optimize', ['wizardjs'], function(){

	gulp.src('js/build/wizard-pre.js')
		.pipe( stripDebug() )
		.pipe( rename('wizard.js') )
		.pipe( gulp.dest('js/build/') );

});

gulp.task('glossarizer-min', function(){
	gulp.src('js/libs/jquery.glossarize.custom.js')
		.pipe( stripDebug() )
		.pipe( uglify() )
		.pipe( rename('jquery.glossarize.custom.min.js') )
		.pipe( gulp.dest('js/libs/') );
});

gulp.task('wizardjs-v2', ['wizardjs'], function(){

	gulp.src('js/build/wizard-pre.js')
		// .pipe( stripDebug() )
		.pipe( rename('wizard-2.js') )
		.pipe( gulp.dest('js/build/') );

});