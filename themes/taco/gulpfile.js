const { dest, src, series, task } = require('gulp');


task('source:fonts:fontAwesome', function() {
  return src(
    [
      'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
      'node_modules/@fortawesome/fontawesome-free/webfonts/*',
    ],
    {base: 'node_modules/@fortawesome/fontawesome-free'},
  )
  .pipe(dest('./source/lib/font-awesome'));
});


task('source', series('source:fonts:fontAwesome'));
