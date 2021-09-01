console.clear();

const tty = require('tty');

const fish1 = '>={----------)>'
const fish2 = `fish2`
const fish3 = `<(---------}=<`;
const fish4 = 'fish4'

let x = 0, y = 0, pos = 1;

setInterval(() => {
    process.stdout.clearLine(0, () => {
    })
    let columns = process.stdout.columns
    process.stdout.cursorTo(x, y);

    if (pos === 1) {
        process.stdout.write(fish1);
        x++;
        if (columns - 14 === x) {
            pos = 2;
        }
    } else if (pos === 2) {
        process.stdout.write(fish2);
        y++;
        if (y === 40) {
            pos = 3;
        }
    } else if (pos === 3) {
        process.stdout.write(fish3);
        x--;
        if (x === 0) {
            pos = 4;
        }
    } else if (pos === 4) {
        process.stdout.write(fish4);
        y--;
        if (y === 0) {
            pos = 1;
        }
    }

}, 10)
