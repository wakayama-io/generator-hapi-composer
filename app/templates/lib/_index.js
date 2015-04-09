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
var Glue = require('glue');
//
// // Internal libs
// var data = require('./data.js');

// Configurations
var config = require('./config.json');

var manifest = {
  server: {},
  connections: [{
      host: config.host,
      port: config.port
    }],
  plugins: config.plugins
};

if (!module.parent) {
  Glue.compose(manifest, function (err, pack) {
    if (err) {
      console.log('Failed composing');
    } else {
      pack.start(function() {
        console.log("Servers is listening on port " + config.port);
      });
    }
  });
}

module.exports = manifest;
