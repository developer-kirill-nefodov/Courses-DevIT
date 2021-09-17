import path from "path";
import express from "express";
import bodyParser from "body-parser";

import {port} from "../config.json"
import * as db from "../db";
import {createRoutes} from "./router";

function createServer() {
    const app = express();

    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, "..", "dist")));
    app.use(express.static("public"));

    db.setUpConnection();

    app.use(createRoutes());

    const server = app.listen(port, () => {
        console.log(`server works on port: ${port}`)
    });
}

createServer();