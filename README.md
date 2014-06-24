# Hapi.js composer generator
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image] [![Coverage Status][coveralls-image]][coveralls-url]

This generator creates a new [hapi](http://hapijs.com/) project with all the boilerplate you need to get started. The hapi-plugins selection in the prompt will be automatically added to the composer manifest.

## Hapi plugins
The generator provides the following optional selection of hapi-plugins by default:

- [lout](https://github.com/spumko/lout)
  
You can customize the hapi-plugins prompt by editing the settings.json file which is located in the root of the generator. The settings.json file is generated after the first run and looks something like this:

```
{
  "generator-hapi-composer": {
    "hapiPlugins": [
      "lout"
    ]
  }
}
```

## npm modules
The generator provides the following optional selection of npm modules by default:

- [gulp-jscs](https://github.com/sindresorhus/gulp-jscs)
- [gulp-bump](https://github.com/stevelacy/gulp-bump)

You can customize the npm-modules prompt by editing the settings.json file which is located in the root of the generator. The settings.json file is generated after the first run and looks something like this:

```
{
  "generator-hapi-composer": {
    "modules": [
      "gulp-jscs",
      "gulp-bump"
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
