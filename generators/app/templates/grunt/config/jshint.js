module.exports = {
  options: {
    reporter: require('jshint-stylish'),
    globals: {
      jQuery: true,
      console: true,
      module: true
    }
  },
  configuration: ['Gruntfile.js', './grunt/**/*.js'],
  scripts: ['<%= config.src %>bonnet/scripts/**/*.js'],
  compiled: ['<%= config.dest %>js/**/*.js', '!<%= config.dest %>js/**/*.min.js']
};
