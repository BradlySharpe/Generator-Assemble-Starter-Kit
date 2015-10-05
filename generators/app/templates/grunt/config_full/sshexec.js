module.exports = {
  cleanRemoteDev: {
    command: "cd <%= credentials.sftp.dev.directory %><%= pkg.domain %>/ && rm -rf *",
    options: {
      host: "<%= credentials.sftp.dev.host %>",
      username: "<%= credentials.sftp.dev.username %>",
      password: "<%= credentials.sftp.dev.password %>"
    }
  }
};
