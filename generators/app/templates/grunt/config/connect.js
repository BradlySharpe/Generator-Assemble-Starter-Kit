module.exports = {
  options: {
    livereload: true,
    port: 3000
  },
  dev: {
    options: {
      base: '<%= config.dest %>'
    }
  }
};
