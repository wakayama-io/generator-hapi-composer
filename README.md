# Hapi.js composer generator
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image] [![Coverage Status][coveralls-image]][coveralls-url]

This generator creates a new [hapi](http://hapijs.com/) project with all the boilerplate you need to get started. The hapi-plugins selection in the prompt will be automatically added to the composer manifest.

## Installation

Install the generator by running: `npm install -g generator-hapi-composer`


## Usage

Make a new directory, and cd into it.
Run the following command and follow the prompts.

```
yo hapi-composer
```

_Note that this template will generate files in the current directory, so be sure to first change to a new directory if you don't want to overwrite existing files._

## Hapi plugins
The generator provides the following optional selection of hapi-plugins by default:

- [lout](https://github.com/spumko/lout)
- [hapi-auth-cookie](https://github.com/spumko/hapi-auth-cookie)
- [bell](https://github.com/spumko/bell)
- [hapi-auth-basic](https://github.com/spumko/hapi-auth-basic)
- [catbox](https://github.com/spumko/catbox)
- [tv](https://github.com/spumko/tv)
- [scooter](https://github.com/spumko/scooter)
- [poop](https://github.com/spumko/poop)
- [good](https://github.com/spumko/good)
- [reptile](https://github.com/spumko/reptile)
- [yar](https://github.com/spumko/yar)
- [crumb](https://github.com/spumko/crumb)
- [bassmaster](https://github.com/spumko/bassmaster)

You can customize the hapi-plugins prompt by editing the .yo-rc-global.json file which is located in your home directory. The file will be generated after the first run if it doesn't already exist. The default hapi-plugin configuration in .yo-rc-global.json looks like this:

```
{
  "generator-hapi-composer": {
  "hapiPlugins": [
        {
          "name": "lout",
          "description": "API documentation generator"
        },
        {
          "name": "hapi-auth-cookie",
          "description": "Cookie authentication plugin"
        },
        {
          "name": "bell",
          "description": "Third-party login plugin"
        },
        {
          "name": "hapi-auth-basic",
          "description": "Basic authentication plugin"
        },
        {
          "name": "catbox",
          "description": "Multi-strategy object caching service"
        },
        {
          "name": "tv",
          "description": "Interactive debug console"
        },
        {
          "name": "scooter",
          "description": "User-agent information plugin"
        },
        {
          "name": "poop",
          "description": "Plugin for handling uncaught exceptions"
        },
        {
          "name": "good",
          "description": "Server and process monitoring plugin"
        },
        {
          "name": "reptile",
          "description": "Plugin for creating a REPL"
        },
        {
          "name": "yar",
          "description": "Session plugin and cookie jar"
        },
        {
          "name": "crumb",
          "description": "CSRF crumb generation and validation"
        },
        {
          "name": "bassmaster",
          "description": "Batch request plugin"
        }
      ]
  }
}
```

## npm modules
The generator provides the following optional selection of npm modules by default:

- [joi](https://github.com/spumko/joi)
- [boom](https://github.com/spumko/boom)

You can customize the npm-modules prompt by editing the .yo-rc-global.json file which is located in your home directory. The file will be generated after the first run if it doesn't already exist. The default npm-modules configuration in .yo-rc-global.json looks like this:

```
{
  "generator-hapi-composer": {
    "npmModules": [
      {
        "name": "joi",
        "description": "Object schema validation"
      },
      {
        "name": "boom",
        "description": "HTTP-friendly error objects"
      }
    ]
  }
}
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [gulp](http://gulpjs.com/).

## Support

Should you have any problems or wishes for improvements, feel free to open up an [issue](https://github.com/wakayama-io/generator-hapi-composer/issues).

##Credits
This generator is based on the [generator-node-gulp](https://github.com/stefanbuck/generator-node-gulp).

##Contributors
- [Koji Wakayama](https://github.com/kojiwakayama)
- [Kentaro Wakayama](https://github.com/kwakayama)

## License

Copyright (c) 2014 Kentaro Wakayama. Licensed under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).

[npm-url]: https://npmjs.org/package/generator-hapi-composer
[npm-image]: https://badge.fury.io/js/generator-hapi-composer.svg
[travis-url]: https://travis-ci.org/wakayama-io/generator-hapi-composer
[travis-image]: https://travis-ci.org/wakayama-io/generator-hapi-composer.svg?branch=master
[daviddm-url]: https://david-dm.org/wakayama-io/generator-hapi-composer.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/wakayama-io/generator-hapi-composer
[coveralls-url]: https://coveralls.io/r/wakayama-io/generator-hapi-composer
[coveralls-image]: https://coveralls.io/repos/wakayama-io/generator-hapi-composer/badge.png
