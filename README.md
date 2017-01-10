# hot-debug
Visionmedia's debug, monkey patched to support hot enable/disable

## Usage

```
npm i --save hot-debug
```

```require('hot-debug')``` ***before* you import anything else** - that way your sub-dependencies will pick up the monkey-patched module, and will get hot enable/disable goodness!

## API

Same as https://github.com/visionmedia/debug.

You don't need to change your imports at all - just go on using ```require('debug')(...)``` and everything will be the same. Except when you call enable(), existing instances will be updated!
