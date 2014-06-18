'use strict';

var Hoek = require("hoek");

var internals = {
      defaults : {
        route: "/"
      }
    };

exports.register = function(plugin, options, next) {
  var settings = Hoek.applyToDefaults(internals.defaults, options);

  plugin.route({
    method: 'GET',
    path: settings.route,
    handler: function(request, reply) {
      reply('don\'t worry, be hapi!');
    }
  });
  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
