# rollup-plugin-ts-paths

Replace typescript paths with relative paths for rollup


## Installation

```bash
npm install --save-dev rollup-plugin-ts-paths
```


## Usage

Generally, you need to ensure that rollup-plugin-ts-paths goes *before* other things (like rollup-plugin-commonjs) in your `plugins` array, so that those plugins can load the correct file for processing.


```js
// rollup.config.js
import tsConfigPaths from 'rollup-plugin-ts-paths';

export default {
  // ...
  plugins: [
    tsConfigPaths()
  ]
};
```


## Options

```js
{
  // The directory the TS config file can be found in (optional)
  tsConfigDirectory: processs.cwd()
}
```


## Limitations

Currently on the first entry of a path specified in a `tsconfig.json` is supported.


## License

MIT