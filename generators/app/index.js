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
          message: 'Project Name'
        },
        {
          name: 'site-domain',
          message: 'Domain Name',
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

      console.log(this.fs);

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
          build: getValue('site-destination'),
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
        this.fs.copyTpl(
          this.templatePath('_package.json'),
          this.destinationPath('package.json'),
          {
            projectName: this.projectName,
            title: this.site.title,
            domain: this.site.domain,
            protocol: this.site.protocol,
            author: this.site.author,
            email: this.site.email
          }
        );
        this.fs.copyTpl(
          this.templatePath('_Gruntfile.js'),
          this.destinationPath('Gruntfile.js'),
          {
            source: this.site.source,
            destination: this.site.destination
          }
        );
        this.fs.copyTpl(
          this.templatePath('bower.json'),
          this.destinationPath('bower.json'),
          {
            projectName: this.projectName,
            boneless: this.site.features.boneless,
            jquery: this.site.features.jquery
          }
        );
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
          }
        ];

        if (this.site.features.boneless) {
          var bonelessFiles = ['_settings.scss', 'base.scss'];
          bonelessFiles.forEach(function(file) {
            self.fs.copy(
              self.templatePath(file),
              self.destinationPath('/' + self.site.source + '/config/sass/' + file)
            );
          });
        }

        config.forEach(function(conf) {
          conf.files.forEach(function(file) {
            var filename = (conf.hasOwnProperty('path') ? conf.path : '') + file + (conf.hasOwnProperty('ext') ? conf.ext : '.js');
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
