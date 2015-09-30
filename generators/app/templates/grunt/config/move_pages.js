module.exports = {
  options: {
    verbose: true,
    overwrite: true
  },
  dev: {
    files:  [
      {
        expand: true,
        cwd: '<%= config.dest %>',
        src: ['**/*.html', '!**/*index.html'],
        dest: '<%= config.dest %>'
      }
    ]
  }
};
