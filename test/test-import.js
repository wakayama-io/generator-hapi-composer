/*global describe, it*/

'use strict';

var assert = require('assert');

describe('generator-hapi-composer', function () {
  it('can be required without throwing', function () {
    var app = require('../app');
    assert(app !== undefined);
  });
});
