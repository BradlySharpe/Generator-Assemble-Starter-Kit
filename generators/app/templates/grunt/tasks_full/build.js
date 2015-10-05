module.exports = function(grunt) {
  grunt.registerTask('build', ['concurrent:build', 'concurrent:minify', 'concurrent:optimise', 'xml_sitemap', 'concurrent:lint']);
};
