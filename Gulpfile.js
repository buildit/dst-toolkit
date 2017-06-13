var Gulp = require('gulp')
var GulpSass = require('gulp-sass')
var webServer = require('gulp-webserver')
var Mustache = require('gulp-mustache')
var forEach = require('gulp-foreach')
var rename = require('gulp-rename')
var merge = require('merge-stream')

var tileLayoutFiles = ['empathize', 'define', 'ideate', 'test', 'iterate'];
var splitLayoutFiles = ['prototype-one'];

Gulp.task('compile', ['build:indexTemplate', 'build:prototypeTemplate', 'build:tileTemplate', 'build:splitTemplate', 'copy:assets'])

Gulp.task('build:indexTemplate', function(){
  return Gulp.src('./src/templates/index.html')
    .pipe(Mustache('./src/data/index.data.json',{},{}))
    .pipe(Gulp.dest('./dist'));
})

Gulp.task('build:prototypeTemplate', function(){
  return Gulp.src('./src/templates/prototypes.html')
    .pipe(Mustache('./src/data/prototype-home.data.json',{},{}))
    .pipe(Gulp.dest('./dist'));
})

Gulp.task('build:tileTemplate', function(){
  return tileLayoutFiles.forEach(function(file){
    Gulp.src("./src/templates/tiles.html")
      .pipe(Mustache('./src/data/'+file+'.data.json',{},{}))
      .pipe(rename(file+'.html'))
      .pipe(Gulp.dest("./dist"));
  })
})

Gulp.task('build:splitTemplate', function(){
  return splitLayoutFiles.forEach(function(file){
    Gulp.src("./src/templates/split.html")
      .pipe(Mustache('./src/data/'+file+'.data.json',{},{}))
      .pipe(rename(file+'.html'))
      .pipe(Gulp.dest("./dist"));
  })
})

Gulp.task('copy:assets', function(){
  var copyAsssets = Gulp.src(['./src/assets/**/*'])
    .pipe(Gulp.dest('./dist/assets/'))
  var copyImages = Gulp.src(['./src/images/**/*'])
    .pipe(Gulp.dest('./dist/images/'))
  var copyTileAssets = Gulp.src(['./src/assets-tile/**/*'])
    .pipe(Gulp.dest('./dist/assets/tiles/'))
  var copyPrototypeAssets = Gulp.src(['./src/assets-prototypes/**/*'])
    .pipe(Gulp.dest('./dist/assets/prototypes/'))

  return merge(copyAsssets, copyImages, copyTileAssets, copyPrototypeAssets)
})

Gulp.task('serve:app', function(){
  return Gulp.src('./dist')
    .pipe(webServer({
      open: true
    }))
})
