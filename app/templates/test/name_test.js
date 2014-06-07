'use strict';

var Lab = require('lab'),
  Hapi = require('hapi');

var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var beforeEach = Lab.beforeEach;
var after = Lab.after;

describe('<%= safeSlugname %>', function() {
  describe('composer', function() {
    var composer;

    beforeEach(function (done) {
      // Require a new composer instance before every test
      composer = require('../lib/');
      done();
    });

    it('can be required without throwing', function(done) {
      expect(composer).to.exist;
      expect(typeof composer).to.equal('object');
      done();
    });
  });
});
