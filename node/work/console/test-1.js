const fs = require('fs');
const path = require('path');

function logFile(pathDir, cb) {
    const files = fs.readdirSync(pathDir, { withFileTypes: true });

    console.log("\x1b[30m", pathDir);
    console.group();
    files.forEach((v) => {
        if (v.isDirectory()) {
            logFile(path.join(pathDir, v.name), cb);
        }
        else {
            console.log("\x1b[31m", v.name);
        }
    });
    console.groupEnd();
}

logFile('../.');