# performance-js-tests

## Install

```
$ npm install --save performance-js-tests
```

## Usage

### testable.js
```js
// for example
window.somethingHappened = (callback) => {
    setTimeout(callback, 1000);
};
```

### index.html
```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
    <script type="text/javascript">
        const startTime = +new Date();
    </script>

    <script type="text/javascript" src="testable.js"></script>

    <script type="text/javascript">
        somethingHappened(() => {
            const currentTime = +new Date();
            window.onCustomEvent({ type: 'timeStamp', data: currentTime - startTime });
        });
    </script>
</body>
</html>
```

### performance test
```js
const performanceTests = require('performance-js-tests');

(async() => {
    await performanceTests({
        puppeteer: {
            htmlFile: 'index.html'
        }
    });
})()
```
Browser will launch 100 times and you can see average file download or performance of js in ms


## Options

```js
{
    // number of launched browsers
    numberOfStarts: 100,

    // maximum latency from the browser
    waitingTime: 30000,

    // koa
    server: {
        enable: true,
        port: 3000,
        baseDir: '.',

        staticKoaOptions: {
            // see link below
        },

        rewrite: {
            // see link below
        }
    },

    puppeteer: {
        // will launch firefox-launch instead of chrome-launch
        useFirefox: false,

        // html file where js is launched
        htmlFile: null,
        launchOptions: {
            // see link below
        }
    }
}
````

[staticKoaOptions](https://github.com/koajs/static)
[rewrite](https://github.com/koajs/rewrite)
[launchOptions](https://github.com/GoogleChrome/puppeteer#default-runtime-settings)
