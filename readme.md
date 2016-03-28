# *vbb-tokenize-station*

Station names in [VBB](http://www.vbb.de) are terribly inconsistent and user's search queries are not perfect either. This module tries to compensate all the weird edge cases:

- `S Südkreuz Bhf (Berlin)` -> `sbahn suedkreuz bahnhof berlin`
- `S Beusselstr` -> `sbahn beussel strasse`
- `S+U Warschauer Str.` -> `sbahn ubahn warschauer strasse`
- `Charité - Campus Benjamin Franklin (Berlin)` -> `charite campus benjamin franklin berlin`

[![npm version](https://img.shields.io/npm/v/vbb-tokenize-station.svg)](https://www.npmjs.com/package/vbb-tokenize-station)
[![build status](https://img.shields.io/travis/derhuerst/vbb-tokenize-station.svg)](https://travis-ci.org/derhuerst/vbb-tokenize-station)
[![dependency status](https://img.shields.io/david/derhuerst/vbb-tokenize-station.svg)](https://david-dm.org/derhuerst/vbb-tokenize-station)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/vbb-tokenize-station.svg)](https://david-dm.org/derhuerst/vbb-tokenize-station#info=devDependencies)

*vbb-tokenize-station* [is ISC-licensed](license.md).


## Installing

```shell
npm install vbb-tokenize-station
```


## Usage

```js
const tokenize = require('vbb-tokenize-station')
tokenize(S+U Warschauer Str.)
.join(' ') // -> 'sbahn ubahn warschauer strasse'
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/vbb-tokenize-station/issues).
