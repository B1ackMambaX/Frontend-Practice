const gulp = require('gulp');

require('./gulp/dev');
require('./gulp/build');

gulp.task("default", gulp.series(
    "clean:dev", 
    gulp.parallel('html:dev', 'styles:dev', 'js:dev', 'images:dev', 'files:dev', 'fonts:dev', 'icons:dev'), 
    gulp.parallel('server:dev', 'watch:dev')
));

gulp.task("build", gulp.series(
    "clean:build", 
    gulp.parallel('html:build', 'styles:build', 'js:build', 'images:build', 'files:build', 'fonts:build', 'icons:build'), 
    gulp.parallel('server:build')
));