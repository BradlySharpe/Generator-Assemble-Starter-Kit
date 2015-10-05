module.exports = function(grunt, options) {
  return {
    dev: {
      options: {
        ignore: [], // Selectors to ignore
        stylesheets: ['/css/stylesheet.css'], // Stylesheets to read
        report: 'min', // Reporting,
        htmlroot: '<%= config.dest %>',
        debug: process.cwd()
      },
      cwd: './',
      src: grunt.file.expand(grunt.config.get('destination') + '**/*.html'),
      dest: '<%= config.dest %>css/stylesheet.css'
    }
  };
};
