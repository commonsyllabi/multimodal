# electron-webpack-plugin

![NPM Badge](https://img.shields.io/npm/v/electron-webpack-plugin.png)

Webpack plugin to restart Electron.

Requires a peer dependency of `electron`.

**NOTE:** As of version `2.0.0`, `relaunchPathMatch` has changed to `test` - which is a regex to test the module ID against.

## API

### new ElectronPlugin(options: object)

#### options
```js
new ElectronPlugin({
    // if a module ID matches this regex and that module has changed, electron will be restarted
    // *required*
    test: /^.\/src\/browser/,
    // the path to launch electron with
    // *required*
    path: "./output",
    // the command line arguments to launch electron with
    // optional
    args: ["--enable-logging"],
    // the options to pass to child_process.spawn
    // see: https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options
    // optional
    options: {
        env: {NODE_ENV: "development"}
    }
})
```

## Example

With this config, Electron will restart when any module in `./src/browser` changes.

```js
const ElectronPlugin = require("electron-webpack-plugin");

module.exports = {
    entry: {
        "browser/index": "./src/browser/index.js",
        "renderer/index": "./src/renderer/index.js",
    },
    output: {
        path: "./output",
        filename: "scripts/[name].js"
    },
    plugins: [
        new ElectronPlugin({
            test: /^.\/src\/browser/,
            path: "output"
        })
    ],
    target: "electron"
};
```

## With webpack-dev-server

You will need to use [write-file-webpack-plugin](https://npm.im/write-file-webpack-plugin),
to allow Electron to access the output path.

You will also need to add the following options:
```js
devServer: {
    // electron will break if client is inlined in main process
    inline: false
}
```

You will also need to add the dev server client to your renderer entry point,
if it is not already:
```js
"renderer/index": [
    "webpack-dev-server/client?http://localhost:3000",
    "./src/scripts/renderer/index.js"
]
```

This will allow HMR with `inline: false`.

(replace `http://localhost:3000` with whatever your dev server URL is)
