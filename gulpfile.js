/*eslint-env node*/

const fs = require('fs');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const useref = require('gulp-useref');
const cleanCSS = require('gulp-clean-css');
// const rename = require('gulp-rename');
// const concat = require('gulp-concat');
const babelMinify = require('babel-minify');
// const child_process = require('child_process');
// const merge = require('merge-stream');
// var packageJson = JSON.parse(fs.readFileSync('./package.json'));

function minifyJs(fileName) {
	const content = fs.readFileSync(fileName, 'utf8');
	const minifiedContent = babelMinify(content).code;
	fs.writeFileSync(fileName, minifiedContent);
	console.log(
		`[${fileName}]: ${content.length}kb -> ${minifiedContent.length}kb`
	);
}

gulp.task('useRef', function() {
	return gulp
		.src('src/index.html')
		.pipe(useref())
		.pipe(gulp.dest('build'));
});

gulp.task('minify', function() {
	minifyJs('build/script.js');

	gulp
		.src('build/style.css')
		.pipe(
			cleanCSS(
				{
					debug: true
				},
				details => {
					console.log(`${details.name}: ${details.stats.originalSize}`);
					console.log(`${details.name}: ${details.stats.minifiedSize}`);
				}
			)
		)
		.pipe(gulp.dest('build'));
});

gulp.task('release', function(callback) {
	runSequence('useRef', 'minify', function(error) {
		if (error) {
			console.log(error.message);
		} else {
			console.log('GAME BUILT SUCCESSFULLY');
		}
		callback(error);
	});
});

gulp.task('default', ['release']);
