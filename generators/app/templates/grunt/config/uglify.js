module.exports = {
  options: {
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */'
  },
  dev: {
    files: {
      '<%= config.dest %>js/<%= pkg.name %>.min.js': [ '<%= config.dest %>js/<%= pkg.name %>.js' ]
    }
  }
};
