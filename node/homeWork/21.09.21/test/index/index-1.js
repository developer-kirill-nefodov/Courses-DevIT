/** Инициализация Node.js сессии осуществляется с помощью функции промежуточной обработки. */
const express = require('express');
const session = require('express-session');

const app = express();

const host = '127.0.0.1';
const port = 7000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(
    session({
        secret: 'you secret key',
        saveUninitialized: true,
    })
)

app.post('/ad', (req, res) => {
    req.session.showAd = req.body.showAd;
    res.sendStatus(200);
})

app.get('/', (req, res) => {
    console.log(req.session.showAd);
    res.sendStatus(200);
})

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
})

