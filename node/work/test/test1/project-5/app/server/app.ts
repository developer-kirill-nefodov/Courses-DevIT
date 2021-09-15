const net = require('net');

const io = require('socket.io')
const express = require('express');

// @ts-ignore
const path = require('path');

const createRoutes = require('./router')

function creatServer() {
    const app = express();

    app.set('views', path.join(__dirname, './views'));
    app.set('views engine', 'hbs');

    app.use(createRoutes());

    const server = app.listen(3000, () => {
        console.log(`server works on port: ${3000}`)
    });
}

creatServer();

