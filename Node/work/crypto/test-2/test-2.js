/** test-2 */


const {fork} = require('child_process');
const child_file = 'child.js';

const child = fork(child_file);

child.on('message', (m) => {
});

child.on('spawn', () => {
  child.send(Random_string()); // return's boolean `true`
});


function Random_string() {
  let st = String.fromCharCode(Math.floor((Math.random() * 24) + 65));
  do {
    let code = Math.floor((Math.random() * 42) + 48);
    if (code < 30 || code > 64) {
      st += String.fromCharCode(code);
    }
  } while (st.length < 10);

  return st.toLocaleLowerCase();
}


