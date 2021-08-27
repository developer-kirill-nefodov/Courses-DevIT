const repl = require('repl');
const os = require('os');
const fs = require('fs');
const ws = fs.createWriteStream('write.txt');
const rd = fs.createReadStream('read.txt');

repl.start({
    prompt: '* ',
    // input: rd,
    // output: ws,

}).on('exit', () => {
    console.log('123');
    process.exit();
});