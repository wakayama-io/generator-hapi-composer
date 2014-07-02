/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('generator-hapi-composer', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('hapi-composer:app', [
        '../../app'
      ]);

      this.app.options['skip-install'] = true;

      done();
    }.bind(this));
  });

  describe('default', function () {
    it('creates expected files', function (done) {
      var expectedFiles = [
        'lib/index.js',
        'test/myproject_test.js',
        '.gitignore',
        '.jshintrc',
        '.travis.yml',
        '.editorconfig',
        'gulpfile.js',
        'package.json',
        'README.md'
      ];

      var expectedContent = [
        ['package.json', /"dependencies": {/],
        ['package.json', /"devDependencies": {/],
        ['package.json', /"hapi": "6.x.x"/],
        ['package.json', /"lab": "3.x.x"/],
        ['package.json', /"node": ">=0.10.22"/],
        ['package.json', /"gulp": "\^3.6.2"/],
        ['package.json', /"gulp-jshint": "\^1.5.5"/],
        ['package.json', /"gulp-nodemon": "\^1.0.4"/],
        ['package.json', / "jshint-stylish": "\^0.2.0"/],
        ['package.json', /"gulp-load-plugins": "\^0.5.1"/],
        ['package.json', /"gulp-plumber": "\^0.6.2"/],
        ['package.json', /"gulp-lab": "\^0.0.7"/],
        ['package.json', /"test": "gulp test"/],
        ['package.json', /"start": "node lib\/index.js"/],
        ['package.json', /"main": "lib\/index.js"/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': [],
        'customHapiPlugin': false,
        'hapiPlugins': [],
        'npmModules': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });

    it('writes project and author information', function (done) {
      var expectedFiles = [
        'lib/index.js',
        'package.json'
      ];

      var expectedContent = [
        ['package.json', /"name": "mymodule"/],
        ['package.json', /"description": "awesome module"/],
        ['package.json', /"homepage": "http:\/\/octocat.com"/],
        ['package.json', /"bugs": "https:\/\/github.com\/octocat\/mymodule\/issues"/],
        ['package.json', /"license": "MIT"/],
        ['package.json', /"name": "Octo Cat"/],
        ['package.json', /"email": "octo@cat.com"/],
        ['package.json', /"url": "https:\/\/github.com\/octocat\/mymodule"/],
        ['lib/index.js', / \* http:\/\/octocat.com/],
        ['lib/index.js', / \* Copyright \(c\) 2014 Octo Cat/],
        ['lib/index.js', / \* Licensed under the MIT license./]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'mymodule',
        'description': 'awesome module',
        'license': 'MIT',
        'githubUsername': 'octocat',
        'authorName': 'Octo Cat',
        'authorEmail': 'octo@cat.com',
        'homepage': 'http://octocat.com',
        'devModules': [],
        'customHapiPlugin': false,
        'hapiPlugins': [],
        'npmModules': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });

  describe('with gulp-bump dev-module', function () {
    it('creates expected files', function (done) {
      var expectedFiles = [
        'gulpfile.js',
        'package.json'
      ];

      var expectedContent = [
        ['package.json', /"gulp-bump": "\^0.1.8"/],
        ['gulpfile.js', /gulp.task\('bump', \['test'\], function \(\) {/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': ['gulp-bump'],
        'hapiPlugins': [],
        'npmModules': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });

  describe('with jscs dev-module', function () {
    it('creates expected files', function (done) {
      var expectedFiles = [
        'gulpfile.js',
        'package.json'
      ];

      var expectedContent = [
        ['package.json', /"gulp-jscs": "\^0.4.2"/],
        ['gulpfile.js', /gulp.task\('lint', function \(\) {/],
        ['gulpfile.js', /.pipe\(plugins.jscs\(\)\)/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': ['gulp-jscs'],
        'customHapiPlugin': false,
        'hapiPlugins': [],
        'npmModules': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });

  describe('with joi npm-module', function () {
    it('creates expected files', function (done) {
      var expectedFiles = [
        'package.json'
      ];

      var expectedContent = [
        ['package.json', /"joi": "*"/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': [],
        'customHapiPlugin': false,
        'hapiPlugins': [],
        'npmModules': ['joi']
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });

  describe('with boom npm-module', function () {
    it('creates expected files', function (done) {
      var expectedFiles = [
        'package.json'
      ];

      var expectedContent = [
        ['package.json', /"boom": "*"/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': [],
        'customHapiPlugin': false,
        'hapiPlugins': [],
        'npmModules': ['boom']
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });

  describe('with custom hapi plugin', function () {
    it('creates expected files', function (done) {
      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': [],
        'customHapiPlugin': true,
        'hapiPlugins': [],
        'npmModules': []
      });

      var expectedFiles = [
        'package.json',
        'lib/plugins',
        'lib/plugins/example',
        'lib/plugins/example/package.json',
        'lib/plugins/example/index.js',
        'lib/config.json'
      ];

      var expectedContent = [
        ['package.json', /"postinstall": "cd lib\/plugins\/example\/ && npm i"/],
        ['lib/config.json', /"\.\.\/\.\.\/\.\.\/lib\/plugins\/example": {}/]
      ];

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });

  describe('with lout plugin', function () {
    it('creates expected files', function (done) {
      var expectedFiles = [
        'package.json',
        'lib/config.json'
      ];

      var expectedContent = [
        ['package.json', /"lout"/],
        ['lib/config.json', /"lout": {}/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': [],
        'customHapiPlugin': false,
        'hapiPlugins': ['lout'],
        'npmModules': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });

  describe('with hapi-auth-cookie plugin', function () {
    it('creates expected files', function (done) {
      var expectedFiles = [
        'package.json',
        'lib/config.json'
      ];

      var expectedContent = [
        ['package.json', /"hapi-auth-cookie"/],
        ['lib/config.json', /"hapi-auth-cookie": {}/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': [],
        'customHapiPlugin': false,
        'hapiPlugins': ['hapi-auth-cookie'],
        'npmModules': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });

  describe('with bell plugin', function () {
    it('creates expected files', function (done) {
      var expectedFiles = [
        'package.json',
        'lib/config.json'
      ];

      var expectedContent = [
        ['package.json', /"bell"/],
        ['lib/config.json', /"bell": {}/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': [],
        'customHapiPlugin': false,
        'hapiPlugins': ['bell'],
        'npmModules': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });

  describe('with hapi-auth-basic plugin', function () {
    it('creates expected files', function (done) {
      var expectedFiles = [
        'package.json',
        'lib/config.json'
      ];

      var expectedContent = [
        ['package.json', /"hapi-auth-basic"/],
        ['lib/config.json', /"hapi-auth-basic": {}/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': [],
        'customHapiPlugin': false,
        'hapiPlugins': ['hapi-auth-basic'],
        'npmModules': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });

  describe('with catbox plugin', function () {
    it('creates expected files', function (done) {
      var expectedFiles = [
        'package.json',
        'lib/config.json'
      ];

      var expectedContent = [
        ['package.json', /"catbox"/],
        ['lib/config.json', /"catbox": {}/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': [],
        'customHapiPlugin': false,
        'hapiPlugins': ['catbox'],
        'npmModules': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });

  describe('with tv plugin', function () {
    it('creates expected files', function (done) {
      var expectedFiles = [
        'package.json',
        'lib/config.json'
      ];

      var expectedContent = [
        ['package.json', /"tv"/],
        ['lib/config.json', /"tv": {}/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': [],
        'customHapiPlugin': false,
        'hapiPlugins': ['tv'],
        'npmModules': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });

  describe('with scooter plugin', function () {
    it('creates expected files', function (done) {
      var expectedFiles = [
        'package.json',
        'lib/config.json'
      ];

      var expectedContent = [
        ['package.json', /"scooter"/],
        ['lib/config.json', /"scooter": {}/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': [],
        'customHapiPlugin': false,
        'hapiPlugins': ['scooter'],
        'npmModules': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });

  describe('with poop plugin', function () {
    it('creates expected files', function (done) {
      var expectedFiles = [
        'package.json',
        'lib/config.json'
      ];

      var expectedContent = [
        ['package.json', /"poop"/],
        ['lib/config.json', /"poop": {}/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': [],
        'customHapiPlugin': false,
        'hapiPlugins': ['poop'],
        'npmModules': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });

  describe('with good plugin', function () {
    it('creates expected files', function (done) {
      var expectedFiles = [
        'package.json',
        'lib/config.json'
      ];

      var expectedContent = [
        ['package.json', /"good"/],
        ['lib/config.json', /"good": {}/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': [],
        'customHapiPlugin': false,
        'hapiPlugins': ['good'],
        'npmModules': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });

  describe('with reptile plugin', function () {
    it('creates expected files', function (done) {
      var expectedFiles = [
        'package.json',
        'lib/config.json'
      ];

      var expectedContent = [
        ['package.json', /"reptile"/],
        ['lib/config.json', /"reptile": {}/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': [],
        'customHapiPlugin': false,
        'hapiPlugins': ['reptile'],
        'npmModules': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });

  describe('with yar plugin', function () {
    it('creates expected files', function (done) {
      var expectedFiles = [
        'package.json',
        'lib/config.json'
      ];

      var expectedContent = [
        ['package.json', /"yar"/],
        ['lib/config.json', /"yar": {}/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': [],
        'customHapiPlugin': false,
        'hapiPlugins': ['yar'],
        'npmModules': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });

  describe('with crumb plugin', function () {
    it('creates expected files', function (done) {
      var expectedFiles = [
        'package.json',
        'lib/config.json'
      ];

      var expectedContent = [
        ['package.json', /"crumb"/],
        ['lib/config.json', /"crumb": {}/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': [],
        'customHapiPlugin': false,
        'hapiPlugins': ['crumb'],
        'npmModules': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });

  describe('with bassmaster plugin', function () {
    it('creates expected files', function (done) {
      var expectedFiles = [
        'package.json',
        'lib/config.json'
      ];

      var expectedContent = [
        ['package.json', /"bassmaster"/],
        ['lib/config.json', /"bassmaster": {}/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'devModules': [],
        'customHapiPlugin': false,
        'hapiPlugins': ['bassmaster'],
        'npmModules': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  });
});
