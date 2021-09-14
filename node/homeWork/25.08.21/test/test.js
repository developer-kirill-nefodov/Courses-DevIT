const http = require('http')
const fs = require('fs')
const url = require('url');
const inspector = require('inspector');


http.createServer((req, res) => {
    const urlParsed = url.parse(req.url, true);

    if (req.method === 'GET' && urlParsed.pathname === '/echo' && urlParsed.query.message) {
        res.end(urlParsed.query.message);
        return;
    }

    res.write(fs.readFileSync(__dirname + '/index.views', 'utf8'));
}).listen(3000, () => {
    console.log('server works on port: 3000');
});