import * as db from "../db";
import {Router} from "express";

export function createRoutes() {
    const router = new Router();

    router.get('/heroes', (req, res) => {
        db.userList().then(data => res.send(data))
    });

    router.post('/heroes', (req, res) => {
        db.creatUser(req.body).then(data => res.send(data))
    });

    router.patch('/heroes/:id', (req, res) => {
        const { id } = req.params;
        db.updateUser(id, req.body).then(data => res.send(data))
    });

    router.delete('/heroes/:id', (req, res) => {
        const {id} = req.params;
        db.deleteUser(id).then(data => res.send(data))
    });

    return router;
}