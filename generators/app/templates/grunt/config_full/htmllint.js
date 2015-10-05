module.exports = {
  dev: {
    options: {
      force: true,
      ignore: []
    },
    // The files that we want to check.
    src: [ '<%= config.dest %>**/*.html' ]
}
};
