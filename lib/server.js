/* global require */
/* global module */

const Koa = require('koa');
const serve = require('koa-static');
const rewrite = require('koa-rewrite');

const server = async (port, baseDir, options, rewrites) => {
    return new Promise((resolve) => {
        const app = new Koa();

        Object.keys(rewrites).forEach((key) => {
            app.use(rewrite(key, rewrites[key]));
        });

        app.use(serve(baseDir, options));

        const currentServer =  app.listen(port);
        currentServer.port = port;
        resolve(currentServer);
    });
};

module.exports = server;
