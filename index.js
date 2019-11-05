/* global require */
/* global module */


const deepExtend = require('deep-extend');
const server = require('./lib/server.js');
const onecycle = require('./lib/onecycle.js');
const PrintProgress = require('./lib/print-progress.js');
const path = require('path');

const printProgress = new PrintProgress();

const preformanceTests = async (options) => {
    options = deepExtend({
        numberOfStarts: 100,
        waitingTime: 30000,
        server: {
            protocol: 'http',
            ip: 'localhost',
            port: 3000,
            baseDir: '.',

            // https://github.com/koajs/static
            staticKoaOptions: {},

            // https://github.com/koajs/rewrite
            rewrite: {}
        },

        puppeteer: {
            useFirefox: false,
            htmlFile: 'http://example.com/',
            launchOptions: {}
        }
    }, options || {});

    let browserName = 'Chrome';
    if (options.puppeteer.useFirefox) {
        browserName = 'Firefox';
    }

    let serverApp = null;
    let url = options.puppeteer.htmlFile;
    if (options.server.enable) {
        url = path.join(`${options.server.protocol}://${options.server.ip}:${options.server.port}`, options.puppeteer.htmlFile);
        serverApp = await server(options.server.port, options.server.baseDir, options.server.staticKoaOptions, options.server.rewrite);
    }

    let currentTimes = 0;
    let result = 0;

    printProgress.reset();

    const loop = async () => {
        const timer = setTimeout(() => {
            throw new Error('Time out!');
        }, options.waitingTime);

        currentTimes += 1;
        const t = await onecycle({
            url: url,
            useFirefox: options.puppeteer.useFirefox,
            launchOptions: options.puppeteer.launchOptions
        });

        clearTimeout(timer);

        result += t;

        printProgress.print([
            'count: ' + currentTimes + ';',
            'time: ' + (result / currentTimes) + ';'
        ]);

        if (currentTimes !== options.numberOfStarts) {
            return await loop();
        } else if (serverApp) {
            return await serverApp.close();
        } else {
            return true;
        }
    };

    console.log(browserName);

    return await loop();
};


module.exports = preformanceTests;
