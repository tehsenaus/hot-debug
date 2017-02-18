# hot-debug [![Build Status](https://travis-ci.org/tehsenaus/hot-debug.svg?branch=master)](https://travis-ci.org/tehsenaus/hot-debug)
Visionmedia's debug, monkey patched to support hot enable/disable

## Usage

```
npm i --save hot-debug
```

```require('hot-debug')``` ***before* you import anything else** - that way your sub-dependencies will pick up the monkey-patched module, and will get hot enable/disable goodness!

## API

All the wholesome goodness of [visionmedia/debug](https://github.com/visionmedia/debug) but with the addition of an `.enable([opt: isEnabled])` method on individual debug channels.

## Example

````javascript
require('hot-debug');

var httpLog = require('debug')('http');
var workerLog = require('debug')('worker');

function configureDebug(config) {
  httpLog.enable(config.log.http);
  workerLog(config.log.workerLog);
}
````

You don't need to change your imports at all - just go on using ```require('debug')(...)``` and everything will be the same. Except when you call enable(), existing instances will be updated!
