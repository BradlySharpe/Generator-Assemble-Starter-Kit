module.exports = {
  //  - Add Pixel fallbacks for REM units (pixrem)
  //  - Add prefix for browsers eg: -webkit-, -moz- (autoprefixer)
  //  - Minify CSS (cssnano)
  options: {
    map: {
      inline: false, // Save source maps in separate files
      annotation: '<%= config.dest %>css/maps/' // Where to save maps
    },
    processors: [
      require('pixrem')(),
      require('autoprefixer')({
        browsers: [ 'last 2 versions', 'ie > 7', '> 1%']
      }),
      require('cssnano')()
    ]
  },
  dev: {
    files : [
      {
        expand: true,
        cwd: '<%= config.dest %>css',
        src: ['**/*.css', '!**/*.min.css'],
        dest: '<%= config.dest %>css',
        ext: '.min.css'
      }
    ]
  }
};
