module.exports = {
  dev: {
    files: {
      "./": "<%= config.dest %>**"
    },
    options: {
      path: "<%= credentials.sftp.dev.directory %><%= pkg.domain %>/",
      host: "<%= credentials.sftp.dev.host %>",
      username: "<%= credentials.sftp.dev.username %>",
      password: "<%= credentials.sftp.dev.password %>",
      srcBasePath: "<%= config.dest %>",
      showProgress: true,
      createDirectories: true
    }
  }
};
