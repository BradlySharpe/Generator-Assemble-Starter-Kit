module.exports = {
  options: {
    dest: '<%= config.dest %>',
    siteRoot: '<%= pkg.protocol %>://<%= pkg.domain %>/'
  },
  dev: {
    files: [
      {
        expand: true,
        cwd: '<%= config.dest %>',
        dest: '<%= config.dest %>',
        src: ['**/*.html']
      }
    ]
  }
};
