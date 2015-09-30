module.exports = function(grunt) {
  grunt.registerTask('deploy', ['concurrent:clean', 'build', 'sftp', 'pagespeed']);
};
