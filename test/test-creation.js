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
        ['package.json', /"peerDependencies": {/],
        ['package.json', /"hapi": "6.x.x"/],
        ['package.json', /"hapi": ">=2.x.x"/],
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
        ['package.json', /"postinstall": "cd lib\/plugins\/example\/ && npm i"/],
        ['package.json', /"main": "lib\/index.js"/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'modules': [],
        'plugins': []
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
        'modules': [],
        'plugins': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  })

  describe('with releaseModule', function () {
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
        'modules': ['releaseModule'],
        'plugins': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  })

  describe('with jscs module', function () {
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
        'modules': ['jscsModule'],
        'plugins': []
      });

      this.app.run({}, function () {
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  })

  describe('with lout plugin', function () {
    it('creates expected files', function (done) {
      var expectedContent = [
        ['package.json', /"lout"/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'modules': [],
        'plugins': ['lout']
      });

      this.app.run({}, function () {
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  })

  describe('with joi plugin', function () {
    it('creates expected files', function (done) {
      var expectedContent = [
        ['package.json', /"joi"/]
      ];

      helpers.mockPrompt(this.app, {
        'name': 'myproject',
        'modules': [],
        'plugins': ['joi']
      });

      this.app.run({}, function () {
        helpers.assertFileContent(expectedContent);
        done();
      });
    });
  })
});
