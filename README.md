# generator-hiroki [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Generate Rest api using hiroki

## Installation

First, install [Yeoman](http://yeoman.io) and generator-hiroki using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-hiroki
```

Then generate your new project:

```bash
yo hiroki
```

Also you can generate a new model in proyect:
```bash

yo hiroki:model
```
## About the structure

* The logic of your application should be contained in these folders:
```
lib/
├── decorators
│   ├── index.js
│   └── user.js
├── logger.js
├── models
│   ├── index.js
│   └── user.js
└── routes
    ├── auth.js
    ├── extract-jwt.js
    ├── home.js
    ├── index.js
    └── users.js
```
* configuration:
```
config/
└── public.js
.env
```


## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).
## Hiroki Documentation
[Documentation here](https://ivanhuay.github.io/hiroki/)

## License

MIT © [percho]()


[npm-image]: https://badge.fury.io/js/generator-hiroki.svg
[npm-url]: https://npmjs.org/package/generator-hiroki
[travis-image]: https://travis-ci.org/ivanhuay/generator-hiroki.svg?branch=master
[travis-url]: https://travis-ci.org/ivanhuay/generator-hiroki
[daviddm-image]: https://david-dm.org/ivanhuay/generator-hiroki.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ivanhuay/generator-hiroki
