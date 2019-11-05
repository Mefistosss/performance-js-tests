/* global process */
/* global module */

class PrintProgress {
    constructor() {
        this.numberOfLinesToClear = 0;
    }

    clear() {
        while (this.numberOfLinesToClear !== 0) {
            --this.numberOfLinesToClear;
            process.stdout.moveCursor(0, -1);
            process.stdout.clearLine();
        }

        this.numberOfLinesToClear = 0;
    }

    reset() {
        this.numberOfLinesToClear = 0;
    }

    print(lines) {
        this.clear();

        // process.stdout.clearLine();
        process.stdout.cursorTo(0);

        lines.forEach((line) => {
            process.stdout.write(line + '\n');
            ++this.numberOfLinesToClear;
        });
    }
}

module.exports = PrintProgress;
