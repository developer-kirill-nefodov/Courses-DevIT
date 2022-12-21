const Store = require('./Store.js');

const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');
const child = require('child_process');

const {Client} = require('ssh2');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function Menu(page, ...data) {
  switch (page) {
    case 'active': {
      const newArr = Store.getActive();
      activeT(newArr);
    }
      break;
    case 'connect': {
      const newArr = readFile();
      connect(newArr)
    }
      break;
    case 'remote': {
      const arrPort = Store.getPort();
      remoteMachine(arrPort, data[0]);
    }
      break;

    case 'tunnel': {
      tunnel(data[0], data[1]);
    }
      break;
    default: {
      Menu('active')
    }
  }
}

function activeT(arr) {
  process.stdout.write('\033c');

  console.log('/ --- active tunnel --- /')
  console.log
  (`\
___________________________
| <PORT>   |   <USERNAME> |
___________________________\
`)
  if (arr.length) {
    for (let key of arr) {
      console.log(`| ${key.port}  |  ${key.username} |`)
    }
    console.log('<--- [c] new tunnel --->')
    console.log('<--- [d + n] --->')

    rl.question('[?]', (label) => {
      if (label === 'c') Menu('connect');
      else if (label === 'd') Menu('killTunnel', arr)
      else activeT(arr);
    })
  } else {
    console.log('<--- new tunnel = [c] --->');

    rl.question('[c]', (label) => {
      if (label === 'c') Menu('connect');
      else activeT(arr);
    })
  }
}

function connect(arr) {
  process.stdout.write('\033c');

  console.table(arr);

  rl.question('[num]', (number) => {

    if (number === 'c') {
      Menu('active')
    } else {
      if (number <= arr.length - 1) {
        try {
          let obj = {
            host: arr[number].host,
            port: arr[number].port,
            username: arr[number].username,
            password: arr[number].password
          }

          fn(obj)
        } catch (e) {
          console.log('((((9');
          setTimeout(() => Menu('connect'), 2000)
        }

      } else {
        console.log('((((9');
        setTimeout(() => Menu('connect'), 2000)
      }
    }
  })
}

function fn(obj) {
  const conn = new Client();

  conn.on('ready', () => {
    const ssh = fs.readFileSync(path.join(os.homedir(), '/.ssh/id_rsa.pub'));
    conn.exec(`echo '${ssh}' >> ~/.ssh/authorized_keys`, {}, (err, stream) => {
      if (err) throw err;

      stream.on('close', () => conn.end());
    });

    conn.exec("netstat -lpt4en | awk '{print $4, $NF}'", {}, (err, stream) => {
      if (err) console.error(err);

      stream.on('data', (data, extended) => {
        console.log(data.toString());

        Store.upDateRemotePort(data)
        Menu('remote', obj)
      });

      stream.on('close', () => conn.end());
    });

  }).connect(obj);

  conn.on('error', (data) => {
    console.log('ERROR CONNECT')
    setTimeout(() => Menu('connect'), 2000)
  })
}

function remoteMachine(arrPort, obj) {
  process.stdout.write('\033c');

  for (let key of arrPort) console.log(`[${key}]`)
  console.log('\n')

  rl.question('[?]', (port) => {
    let val = false;

    for (let idx of arrPort) if (port === idx) val = true;

    if (val) Menu('tunnel', port, obj)
    else remoteMachine(arrPort, obj);
  })
}

function tunnel(PORT, obj) {
  const {host, port, username, password} = obj;

  process.stdout.write('\033c');

  console.log('Port\n')
  rl.question(`[${PORT}]: `, (newPort) => {

    console.log(`ssh -L ${newPort}:localhost:${PORT} ${username}@${host}`);

    const childTunnel = child.spawn(`ssh -tt -NL ${newPort}:localhost:${PORT} ${username}@${host}`, {shell: true});

    childTunnel.on('close', () => {
      if (2999 < newPort && newPort > 10000) {
        console.log('if true')
        Store.addActive({host: host, port: PORT, username: username, password: password});

        Menu('active');
      } else {
        console.log('(((((9')
        setTimeout(() => tunnel(PORT, obj), 2000)
      }
    })

    childTunnel.stderr.on('data', (data) => {
      console.log('works')
      if (data.includes('cannot')) {
        console.log(`\nWarning: The tunnel has not been forwarded, remove the connection on port ${port}\n`);
      }
    });
  })


}

function deleteTunnel(arr) {
  process.stdout.write('\033c');

  const newArr = [];

  for (let key of arr) newArr.push({port: key.port, username: key.username})

  console.table(newArr);
  console.log('<---num delete--->')
  rl.question('[d]', (num) => {
    if (num <= newArr.length - 1) {
    }
  })
}

function readFile(file) {
  let arr = [], data = [];

  fs.readFileSync(file, 'utf-8').split(/\n/).forEach((value) => {
    arr.push(value);
  })

  for (let key of arr) {
    let idx = key.split(' ')
    if (idx.length === 4) {
      data.push({host: idx[0], port: idx[1], username: idx[2], password: idx[3]})
    }
  }
  return data;
}

// Menu();
