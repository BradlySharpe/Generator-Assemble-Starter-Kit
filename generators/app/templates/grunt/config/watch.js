module.exports = {
  options: {
    livereload: true,
    livereloadOnError: false,
    interrupt: false
  },
  dev: {
    files: [
      './*.{js,json}', './grunt/**/*.js', '<%= config.src %>config/helpers/**/*.js'],
    tasks: ['assemble', 'compass', 'postcss']
  },
  html: {
    files: ['<%= config.src %>**/*.hbs'],
    tasks: ['assemble']
  },
  css: {
    files: ['<%= config.src %>config/sass/*.scss', '<%= config.src %>config/sass/pages/*.scss', '<%= config.dest %>**/*.html'],
    tasks: ['compass', 'postcss']
  },
};
