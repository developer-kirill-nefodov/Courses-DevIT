const express = require('express');

// @ts-ignore
const path = require('path');

const createRoutes = require('./router')


    const app = express();

    app.set('views', path.join(__dirname, './views'));
    app.set('views engine', 'hbs');

    app.use(createRoutes());


    const server = app.listen(3000, () => {
        console.log(`server works on port: ${3000}`)
    });

