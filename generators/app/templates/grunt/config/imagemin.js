module.exports = {
  options: {
    optimizationLevel: 5
  },
  dev: {
    files: [
      {
        expand: true,
        cwd: '<%= config.src %>images',
        src: ['**/*.{png,jpg,jpeg,gif,svg}'],
        dest: '<%= config.dest %>images'
      }
    ]
  }
};
