module.exports.register = function(Handlebars, options) {
  'use strict';

  Handlebars.registerHelper('replaceStr', function(haystack, needle, replacement) {
    if (haystack && needle)
      return haystack.replace(needle, replacement);
    return '';
  });

  Handlebars.registerHelper('createLink', function(path) {
    if (path)
      return path.replace('dist', '').replace('.html', '');
    return '';
  });

  Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
  });

  Handlebars.registerHelper('config', function(path, options) {
    var attrs = {
        "lowercase": false,
        "prefix": "",
        "sufix": ""
      },
      json = require('grunt').file.readJSON('./package.json'),
      keys = path.split('.'),
      next = keys.shift();

    for (var prop in options.hash) {
      if (attrs.hasOwnProperty(prop))
        attrs[prop] = options.hash[prop];
    }

    function getValue(json, property, keys) {
      if (json.hasOwnProperty(property)) {
        var prop = json[property];
        if (0 < keys.length) {
          if ("object" === typeof prop) {
            var next = keys.shift();
            return getValue(prop, next, keys);
          }
        } else {
          var output = attrs.prefix + prop + attrs.sufix;
          return (attrs.lowercase) ? output.toLowerCase() : output;
        }
      }
      return null;
    }

    return getValue(json, next, keys);
  });
};
