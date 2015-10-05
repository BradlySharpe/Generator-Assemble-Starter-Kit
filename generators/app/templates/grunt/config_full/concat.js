module.exports = {
  dev: {
    src: '<%= config.src %>bonnet/scripts/**/*.js',
    dest: '<%= config.dest %>js/<%= pkg.name %>.js'
  }
};
