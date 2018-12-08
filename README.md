# deep

[![npm](https://img.shields.io/npm/v/@aleclarson/deep.svg)](https://www.npmjs.com/package/@aleclarson/deep)
[![Build status](https://travis-ci.org/aleclarson/deep.svg?branch=master)](https://travis-ci.org/aleclarson/deep)
[![codecov](https://codecov.io/gh/aleclarson/deep/branch/master/graph/badge.svg)](https://codecov.io/gh/aleclarson/deep)
[![Bundle size](https://badgen.net/bundlephobia/min/@aleclarson/deep)](https://bundlephobia.com/result?p=@aleclarson/deep)
[![Install size](https://packagephobia.now.sh/badge?p=@aleclarson/deep)](https://packagephobia.now.sh/result?p=@aleclarson/deep)
[![Code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/alecdotbiz)

Woah. That's deep.

```js
import deep from '@aleclarson/deep'
// or
import { get, set, unset } from '@aleclarson/deep'

let val
val = deep.get(obj, 'a.b.c') // dot-notation
val = deep.get(obj, ['a', 'b', 'c']) // key path
val = deep.get(obj, 'a', 0) // default value
val = deep.set(obj, 'a', 1) // type-safe shallow keys
val = deep.unset(obj, 'a') // delete an optional property
val = deep.delete(obj, 'a') // "delete" is an alias for "unset"
val = deep.delete(obj, 'a', 0) // default value
```

The `get` function returns either the default value or `undefined` when a
property cannot be resolved.

The `set` function returns the new value. When a parent is nullish, an object is
created on-the-fly. When a parent is a non-nullish non-object, an error is thrown.

The `unset` function returns the old value. When a property cannot be resolved,
this function is a no-op.

&nbsp;

## Inspiration

- dlv: https://github.com/developit/dlv
- dset: https://github.com/lukeed/dset

&nbsp;

## License

MIT
