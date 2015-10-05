module.exports = {
  options: {
    log: true
  },
  dev: {
    files: [
      {
        expand: true,
        cwd: '<%= config.dest %>css/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= config.dest %>css/'
      }
    ]
  }
};
