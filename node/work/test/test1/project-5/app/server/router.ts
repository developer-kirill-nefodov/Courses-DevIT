const {Router} = require("express");

module.exports = function createRoutes() {
    const router = new Router();

    router.get('/tunnels', (req, res) => {
        res.render('tunnels.hbs')
    });

    router.get('/hosts', (req, res) => {
        res.render('hosts.hbs')
    });

    router.get('/ports', (req, res) => {
        res.render('ports.hbs')
    });

    router.get('/add', (req, res) => {
        res.render('add.hbs')
    });

    return router;
}