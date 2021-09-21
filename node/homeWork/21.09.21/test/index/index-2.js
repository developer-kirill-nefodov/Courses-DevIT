//Пример простого счетчика просмотров
const cookieSession = require('cookie-session')
const express = require('express')

const app = express()

app.set('trust proxy', 1)

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

app.get('/', function (req, res, next) {
    req.session.views = (req.session.views || 0) + 1

    res.end(req.session.views + ' views')
})

app.listen(3000);

