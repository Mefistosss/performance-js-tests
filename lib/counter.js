/* global module */
/* global require */

const EventEmitter = require('events');

class Counter {
    constructor() {
        this.event = new EventEmitter();
        this.time = null;
    }

    setTimestamp(time) {
        this.time = time;
        this.event.emit('counter-time', time);
    }

    async getTime() {
        return new Promise((resolve) => {
            if (this.time === null) {
                this.event.once('counter-time', resolve);
            } else {
                resolve(this.time);
            }
        });
    }
}

module.exports = Counter;
