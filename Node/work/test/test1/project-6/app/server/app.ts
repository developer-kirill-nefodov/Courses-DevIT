import net from "net";

import path from "path";
import express from "express";

import {Task} from "../cli/Store";

const {port} = require("../config.json");

const app = express();
const client = new net.Socket();
const tasks: any = [];

let count: number = 0;
const urlencodedParser = express.urlencoded({extended: false});

app.set('views', path.join(__dirname, '/views'));
app.set('views engine', 'hbs');
app.use(express.static(path.join(__dirname, '/views/hbs')))

client.setEncoding('utf8');

app.listen(port, () => {
  console.log(`server works on port: ${port}`)
})

client.connect('../mySocket');


client.on('data', (data) => {

  // if (data.toString() === 'err') {
  //     throw new Error('ERROOORRR((( BAYBAY!!!')
  // }

  try {
    let dataObj = JSON.parse(data.toString());
    let task = tasks.filter((v: any) => v.id == dataObj.id)[0];
    task?.cb(dataObj.data, dataObj.label, dataObj.action);


  } catch (e) {

  }

});

app.post('/', urlencodedParser, (req, res) => {
  const task: Task = {
    id: count++,
    action: req.body.action,
    label: req.body.label,
    cb: (data: null | string[], label: string, action: string) => {
      res.render(`hbs/${action}.hbs`, {
        content: data,
        label: label
      });
    }
  }

  tasks.push(task);
  client.write(JSON.stringify(task));
})

app.get('/', ((req, res) => {
  res.render(`hbs/start.hbs`);
}))
