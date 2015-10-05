module.exports = {
  options: {
    removeComments: true,
    collapseWhitespace: true
  },
  dev: {
    files: [
      {
        expand: true,
        cwd: '<%= config.dest %>',
        src: ['**/*.html', '!css/**/*', '!js/**/*', '!images/**/*'],
        dest: '<%= config.dest %>'
      }
    ]
  }
};
