module.exports = {
  options: {
    livereload: true,
    livereloadOnError: false,
    interrupt: false
  },
  dev: {
    files: [
      './*.{js,json}', './grunt/**/*.js', '<%= config.src %>bonnet/helpers/**/*.js'],
    tasks: ['build']
  },
  html: {
    files: ['<%= config.src %>**/*.hbs'],
    tasks: ['assemble', 'htmlmin', 'move_pages', 'xml_sitemap']
  },
  css: {
    files: ['<%= config.src %>bonnet/sass/*.scss', '<%= config.src %>bonnet/sass/pages/*.scss', '<%= config.dest %>**/*.html'],
    tasks: ['compass', 'cmq', 'uncss', 'postcss', 'csslint']
  },
  javascript: {
    files: ['<%= config.src %>bonnet/scripts/**/*.js'],
    tasks: ['concat', 'uglify', 'jshint']
  },
  images: {
    files: ['<%= config.src %>images/**/*.{png,jpg,jpeg,gif,svg}'],
    tasks: ['newer:imagemin']
  }
};
