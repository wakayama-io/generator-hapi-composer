/*
 * <%= props.name %>
 * <%= props.homepage %>
 *
 * Copyright (c) <%= currentYear %><% if (props.authorName) { %> <%= props.authorName %><% } %>
 * Licensed under the <%= props.license %> license.
 */

'use strict';

// Following the 'Node.js require(s) best practices' by
// http://www.mircozeiss.com/node-js-require-s-best-practices/

// // Nodejs libs
// var fs = require('fs');
//
// // External libs
var Hapi = require('hapi');
//
// // Internal libs
// var data = require('./data.js');

// Configurations
var config = require('./config.json');

var manifest = {
  servers: [{
    host: config.host,
    port: config.port
  }],
  plugins: config.plugins
};

var composer = new Hapi.Composer(manifest);

if (!module.parent) {
  composer.compose(function(err) {
    if (err) {
      console.log('Failed composing');
    } else {
      composer.start(function() {
        console.log("Servers started");
      });
    }
  });
}

module.exports = composer;
