'use strict';

var util = require('util');
var path = require('path');
var npmLatest = require('npm-latest');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var Config = require('../config');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.settings = new Config();
  },

  askForProjectInfo: function () {
    var cb = this.async();
    var log = this.log;

    log(yosay('Hello, and welcome to the hapi composer generator. Let\'s be awesome together!'));

    var prompts = [{
      name: 'name',
      message: 'Project Name',
      default: path.basename(process.cwd())
    }, {
      name: 'description',
      message: 'Description',
      default: 'The best project ever.'
    }, {
      name: 'homepage',
      message: 'Homepage'
    }, {
      name: 'license',
      message: 'License',
      default: 'MIT'
    }, {
      name: 'githubUsername',
      message: 'GitHub username'
    }, {
      name: 'authorName',
      message: 'Author\'s Name'
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email'
    }, {
      name: 'authorUrl',
      message: 'Author\'s Homepage'
    }];

    this.currentYear = (new Date()).getFullYear();

    // Write settings default values back to prompt
    var meta = this.settings.getMeta();
    prompts.forEach(function (val) {
      if (meta[val.name]) {
        val.default = meta[val.name];
      }
    }.bind(this));

    this.prompt(prompts, function (answers) {
      this.slugname = this._.slugify(answers.name);
      this.safeSlugname = this.slugname.replace(
          /-+([a-zA-Z0-9])/g,
          function (g) {
            return g[1].toUpperCase();
          }
      );

      if (answers.homepage) {
        answers.homepage = answers.homepage.trim();
      }
      if (answers.license) {
        answers.license = answers.license.trim() || 'MIT';
      }
      if (answers.authorName) {
        answers.authorName = answers.authorName.trim();
      }
      if (answers.authorEmail) {
        answers.authorEmail = answers.authorEmail.trim();
      }
      if (answers.authorUrl) {
        answers.authorUrl = answers.authorUrl.trim();
      }

      this.settings.setMeta(answers);

      if (answers.githubUsername && answers.githubUsername.trim()) {
        this.repoUrl = 'https://github.com/' + answers.githubUsername + '/' + this.slugname;
      } else {
        this.repoUrl = 'user/repo';
        answers.githubUsername = 'user';
      }

      if (!answers.homepage) {
        answers.homepage = this.repoUrl;
      }

      this.props = answers;

      cb();
    }.bind(this));
  },

  askForDevModules: function () {
    var cb = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'modules',
      message: 'Which modules would you like to include?',
      choices: [{
          value: 'jscsModule',
          name: 'jscs (JavaScript Code Style checker)',
          checked: true
        }, {
          value: 'releaseModule',
          name: 'release (Bump npm versions with Gulp)',
          checked: true
        }
      ]
    }];

    this.prompt(prompts, function (answers) {

      var hasMod = function (mod) {
        return answers.modules.indexOf(mod) !== -1;
      };

      this.jscsModule = hasMod('jscsModule');
      this.releaseModule = hasMod('releaseModule');
      this.coverallsModule = true;

      cb();

    }.bind(this));
  },

  askForHapiPlugins: function () {
    var cb = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'plugins',
      message: 'Which hapi plugins would you like to include?',
      choices: []
    }];

    var plugins = this.settings.getDependencies();
    plugins.forEach(function (pkg) {
      prompts[0].choices.push({
        value: pkg.name,
        name: util.format('%s (%s)', pkg.name, pkg.description),
        checked: false
      });
    });

    this.prompt(prompts, function (answers) {
      var hasMod = function (mod) {
        return answers.plugins.indexOf(mod) !== -1;
      };

      this.usedPlugins = {};
      plugins.forEach(function (dep) {
        if (hasMod(dep.name)) {
          this.usedPlugins[dep.name] = 'latest';
        }
      }.bind(this));

      cb();

    }.bind(this));
  },

  getLatestVersions: function () {
    var cb = this.async();
    var count = Object.keys(this.usedPlugins).length;

    if (count === 0) {
      return cb();
    }

    for (var packageName in this.usedPlugins) {
      npmLatest(packageName, {timeout: 1900}, function (err, result) {
        if (!err && result.name && result.version) {
          this.usedPlugins[result.name] = result.version;
        }
        if (!--count) {
          cb();
        }
      }.bind(this));
    }
  },

  resolveDependencies: function () {
    this.dependencies = '';
    for (var name in this.usedPlugins) {
      var version = this.usedPlugins[name];
      this.dependencies += util.format('\n    "%s": "%s",', name, version);
    }
    if (this.dependencies.length > 0) {
      this.dependencies = this.dependencies.replace('\n', '');
      this.dependencies = this.dependencies.substring(0, this.dependencies.length - 1);
    }
  },

  setupProject: function () {
    this.copy('jshintrc', '.jshintrc');
    this.copy('_gitignore', '.gitignore');
    this.copy('_travis.yml', '.travis.yml');
    this.copy('editorconfig', '.editorconfig');
    if (this.jscsModule) {
      this.copy('jscs.json', '.jscs.json');
    }

    this.template('_README.md', 'README.md');
    this.template('_gulpfile.js', 'gulpfile.js');
    this.template('_package.json', 'package.json');

    this.mkdir('lib');
    this.template('lib/_index.js', 'lib/index.js');
    this.copy('lib/config.json', 'lib/config.json');
    this.mkdir('lib/plugins');
    this.mkdir('lib/plugins/example');
    this.copy('lib/plugins/example/package.json', 'lib/plugins/example/package.json');
    this.copy('lib/plugins/example/index.js', 'lib/plugins/example/index.js');

    this.mkdir('test');
    this.template('test/name_test.js', 'test/' + this.slugname + '_test.js');
  },

  installNpm: function () {
    this.installDependencies({
      bower: false,
      skipInstall: this.options['skip-install']
    });
  }
});
