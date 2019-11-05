/* global require */
/* global module */

const puppeteer = require('puppeteer');
const puppeteerFF = require('puppeteer-firefox');
const Counter = require('./counter');


const onecycle = async (options) => {
    let browser = null;
    const counter = new Counter();

    if (options.useFirefox) {
        browser = await puppeteerFF.launch(options.launchOptions);
    } else {
        browser = await puppeteer.launch(options.launchOptions);
    }

    const page = await browser.newPage();
    await page.setCacheEnabled(false);

    await page.exposeFunction('onCustomEvent', (e) => {
        if (e.type === 'timeStamp') {
            counter.setTimestamp(e.data);
        }
    });

    await page.goto(options.url);

    const time = await counter.getTime();

    await browser.close();
    return time;
};

module.exports = onecycle;
