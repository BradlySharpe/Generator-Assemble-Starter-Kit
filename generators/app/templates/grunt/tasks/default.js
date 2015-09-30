module.exports = function(grunt) {
  grunt.registerTask('default', ['clean:localDev', 'build', 'connect', 'watch']);
};
