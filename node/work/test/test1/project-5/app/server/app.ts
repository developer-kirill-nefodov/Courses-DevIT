//@ts-ignore
const net = require('net');
const {join} = require('path');
const express = require('express');
const hbs = require('express-handlebars');

const app = express();

const client = new net.Socket();

const {port} = require('../config.json')

app.enable('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + 'views/'}))
app.set('views', join(__dirname, './views'));
app.set('views engine', 'hbs');
client.setEncoding('utf8');


// app.set('port', (process.env.PORT || port))

app.listen(port, ()=> {
    console.log(`server works on port: ${app.get('port')}`)
})

client.connect('../mySocket');


client.on('data', (data) => {
    data = JSON.parse(data);
    const {method, label} = data;

    console.log(method, ': met')
    console.log(label, ': label')

    console.log(data)
})

// setTimeout(() => {
//     client.write(JSON.stringify({method: 'active', label: 'c'}))
// }, 3000)




app.get('/active', (req, res) => {

    client.write(JSON.stringify({method: 'active', label: 'c'}))

    client.on('data', (data) => {
        data = JSON.parse(data);
        const {method, label} = data;

        if(label.length) {
            res.render('hbs/active.hbs', {
                title: method,
                content: label,
                a1: `new [c]`, a2: `[d+n]`,
            });
        } else {
            res.render('hbs/active.hbs', {
                title: method,
                content: label,
                a1: `new [c]`,
            });
        }

    })
});
//
// app.get('/connect', (req, res) => {
//     res.render('hbs/connect.hbs', {title: 'connect'});
// });
//
// app.get('/remote', (req, res) => {
//     res.render('hbs/remote.hbs', {title: 'tunnels'});
// });
//
// app.get('/tunnel', (req, res) => {
//     res.render('hbs/tunnel.hbs', {title: 'add tunnel'});
// });



