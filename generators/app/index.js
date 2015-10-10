(function() {
  'use strict';
  var yeoman = require('yeoman-generator');
  var chalk = require('chalk');
  var yosay = require('yosay');
  var slug = require('slugify');
  var mkdirp = require('mkdirp');
  var fs = require('fs');

  module.exports = yeoman.generators.Base.extend({
    prompting: function () {
      var done = this.async();

      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the ' + chalk.green('Assemble Starter Kit') + ' generator!'
      ));

      var prompts = [
        {
          name: 'project',
          message: 'Project Name',
          default: 'test'
        },
        {
          name: 'site-domain',
          message: 'Domain Name',
          default: 'test.com',
          //default: 'test' + (Math.floor(Math.random() * 100) + 1) + '.com.au'
        },
        {
          name: 'site-source',
          message: 'Grunt Build Source Directory',
          default: 'src'
        },
        {
          name: 'site-destination',
          message: 'Grunt Build Destination Directory',
          default: 'dist'
        },
        {
          name: 'user-githubUsername',
          message: 'GitHub Username',
          default: 'brad7928'
        },
        {
          name: 'user-githubPassword',
          message: 'GitHub Password',
          type: 'password'
        },
        {
          type: 'checkbox',
          name: 'features',
          message: 'What features would you like?',
          choices: [
            {
              name: 'Boneless',
              value: 'includeBoneless',
              checked: true
            },{
              name: 'jQuery',
              value: 'includeJquery',
              checked: false
            }
          ]
        }
      ];

      this.prompt(prompts, function (props) {

        function getValue(feat) {
          return (props && props.hasOwnProperty(feat)) ? props[feat] : null;
        }

        function hasFeature(feat) {
          return props.features && props.features.indexOf(feat) > -1;
        }

        this.site = {
          title: getValue('project'),
          source: getValue('site-source'),
          destination: getValue('site-destination'),
          domain: getValue('site-domain'),
          protocol: 'http',
          author: this.user.git.name(),
          email: this.user.git.email(),
          features: {
            boneless: hasFeature('includeBoneless'),
            jquery: hasFeature('includeJquery'),
          }
        };
        this.projectName = slug(this.site.title);
        this.githubUsername = getValue('user-githubUsername');
        this.githubPassword = getValue('user-githubPassword');
        done();
      }.bind(this));
    },

    writing: {
      sanityChecking: function () {

        if (!("" + this.projectName).trim()) {
          this.log.error(chalk.red('Error: Project Name not specified'));
          process.exit(1);
        }

        if (!/(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)/.test(this.site.domain)) {
          this.log.error(chalk.red('Error: Domain is not valid, cannot create folder (Domain: "' + this.site.domain + '")'));
          process.exit(2);
        }

        if (fs.existsSync(this.site.domain)) {
          this.log.error(chalk.red('Error: Directory already exists! (' + this.site.domain + ')'));
          process.exit(3);
        }

      },

      createDirectories: function() {
        var self = this;
        // Create Project Folder
        mkdirp(this.site.domain);

        // Update Root Path
        self.destinationRoot(self.destinationPath(self.site.domain));

        // Create Subdirectories
        [
          'grunt/config',
          'grunt/tasks',
          self.site.source+'/config/sass/pages',
          self.site.source+'/config/helpers',
          self.site.source+'/config/layouts',
          self.site.source+'/config/partials',
          self.site.source+'/config/scripts',
          self.site.source+'/content/_pages',
          self.site.source+'/content/blog',
          self.site.source+'/images',
          self.site.build
        ].forEach(
          function(dir) { mkdirp(dir); }
        );
      },

      copyTemplates: function() {
        var self = this,
          files = ['_package.json', '_Gruntfile.js', '_bower.json'];

        files.forEach(function(filename) {
          if (!self.fs.exists(self.templatePath(filename))) {
            self.log.error("File doesn't exists: " + self.templatePath(filename));
          }
          self.fs.copyTpl(
            self.templatePath(filename),
            self.destinationPath(filename.substring(1)),
            {
              projectName: self.projectName,
              title: self.site.title,
              domain: self.site.domain,
              protocol: self.site.protocol,
              author: self.site.author,
              email: self.site.email,
              source: self.site.source,
              destination: self.site.destination,
              boneless: self.site.features.boneless,
              jquery: self.site.features.jquery
            }
          );
        });
      },

      copyFiles: function() {
        var self = this;
        var config = [
          {
            files: ['.gitignore', '_credentials.json', 'README.md'],
            ext: ''
          },
          {
            path: 'grunt/config/',
            files: ['assemble', 'clean', 'compass', 'connect', 'postcss', 'watch']
          },
          {
            path: 'grunt/tasks/',
            files: ['default']
          },
          {
            path: 'src/config/helpers/',
            files: ['helpers']
          },
          {
            path: 'src/config/layouts/',
            files: ['page'],
            ext: '.hbs'
          },
          {
            path: 'src/config/partials/',
            files: ['site-footer', 'site-header'],
            ext: '.hbs'
          },
          {
            path: 'src/config/sass/',
            files: ['_slider', '_settings'],
            ext: '.scss'
          },
          {
            path: 'src/config/scripts/',
            files: ['helpers']
          },
          {
            path: 'src/content/_pages/',
            files: ['index'],
            ext: '.hbs'
          }
        ];

        var bonelessFiles = [
          {
            filename: 'base',
            destination: this.projectName,
            ext: '.scss'
          }
        ];
        bonelessFiles.forEach(function(file) {
          if (!self.fs.exists(self.templatePath('src/config/sass/' + file.filename + file.ext))) {
            self.log.error("File doesn't exists: " + self.templatePath('src/config/sass/' + file.filename + file.ext));
          }
          self.fs.copyTpl(
            self.templatePath('src/config/sass/' + file.filename + file.ext),
            self.destinationPath(self.site.source + '/config/sass/' + file.destination + file.ext),
            {
              boneless: this.site.features.boneless
            }
          );
        });

        config.forEach(function(conf) {
          conf.files.forEach(function(file) {
            var filename = (conf.hasOwnProperty('path') ? conf.path : '') + file + (conf.hasOwnProperty('ext') ? conf.ext : '.js');
            if (!self.fs.exists(self.templatePath(filename))) {
              self.log.error("File doesn't exists: " + self.templatePath(filename));
            }
            self.fs.copy(
              self.templatePath(filename),
              self.destinationPath(filename)
            );
          });
        });
      }
    },

    install: function () {
      var self = this;
      self.installDependencies({
        npm: true,
        bower: true,
        callback: function() {
          self.log.ok('Finished!');
        }
      });
    },

    end: {
      createGithubRepository: function() {
        var self = this;

        if (!self.githubUsername || !self.githubPassword)
          return;

        var gitCommands = {
          init: ['init'],
          remote: ['remote', 'add', 'origin', 'https://' + self.githubUsername + ':' + self.githubPassword + '@github.com/' + self.githubUsername + '/' + self.projectName + '.git'],
          add: ['add', '--all'],
          commit: ['commit', '-m', 'Initial commit from Yeoman Generator'],
          push: ['push', '-u', 'origin', 'master']
        };

        function run(args, callback, command, log) {
          command = command || 'git';
          log = log || false;
          var process = self
            .spawnCommand(command, args, { stdio: 'pipe' })
            .on('close', function(data) {
              if (0 === data) {
                if ('function' === typeof callback) { callback(); }
              } else {
                self.log.error(chalk.red("Error spawning command\n") + "command:\n  " + command + "\nargs:\n  " + args.join(" "));
              }
            })
            .stdout.on('data', function (data) {
              if (log) { console.log(args[0] + " - ", data.toString()); }
            });
        }

        function createRepo(callback) {
          run(['-u', self.githubUsername + ':' + self.githubPassword, 'https://api.github.com/user/repos', '-d', '{"name": "' + self.projectName + '"}'], callback, 'curl');
        }

        createRepo(function() {
          run(gitCommands.init, function() {
            run(gitCommands.remote, function() {
              run(gitCommands.add, function() {
                run(gitCommands.commit, function() {
                  run(gitCommands.push, undefined, undefined, true);
                });
              }, undefined, true);
            });
          }, undefined, true);
        });
      }
    }
  });
})();
