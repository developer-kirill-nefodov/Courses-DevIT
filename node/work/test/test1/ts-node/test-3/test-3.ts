// const {getIPRange} = require('get-ip-range')
// const os = require('os')
// const fs = require('fs')
//
// const task = fillTask(parseArgs(process.argv))
//
// main(task).then((result) => {
//     formatOutput(result, task.output)
// }).catch(console.error)
//
//
// function parseArgs(args) {
//     let data = {
//         options: {},
//         args: []
//     }
//
//   let lastOption;
//
//   args = args.map(s => s.trim()).filter(s => !!s)
//
//   for(const arg of args) {
//       if(arg.indexOf('-') === 0) {
//           lastOption = arg.slice(1);
//           data.options[lastOption] = ''
//       } else {
//           if(lastOption !== null) {
//               data.options[lastOption] = arg
//               lastOption = null;
//           } else {
//               data.args.push(arg)
//           }
//       }
//   }
//
//   return data
// }
//
// function fillTask(argv) {
//     if(!argv.args[2]) {
//         throw new Error('fill network mask')
//     }
//
//   return {
//       ipRange: argv.args[2],
//       output: argv.args[3] || 'console'
//   }
// }
//
// function listToChunk(list, count) {
//     let i,j, tmp = [];
//     for (i = 0,j = list.length; i < j; i += count) {
//         tmp.push(list.slice(i, i + count))
//     }
//     return tmp;
// }
//
// function rangeToChunk(range, count) {
//     return listToChunk(getIPRange(range), count)
// }
//
// function ping(ip){
//     return new Promise((resolve) => {
//         resolve({ping: true, latency: 10})
//     })
// }
//
// function ssh(ip) {
//     return new Promise((resolve) => {
//         resolve({ss h: false})
//     })
// }
//
// function formatOutput(data, output) {
//     const str = JSON.stringify(data)
//
//   switch (output){
//       case "console":
//           printOutput(str)
//           break;
//       default:
//           saveToFile(str, output)
//   }
// }
//
// function saveToFile(str, file) {
//     fs.writeFileSync(file, str, {flag: 'w'})
// }
//
// function printOutput(str) {
//     process.stdout.write(str)
// }
//
// async function processIp(ip){
//     return {ip, ...await ping(ip), ...await ssh(ip)}
// }
//
// async function* processChunks(ipChunks) {
//     let chunks = ipChunks.slice();
//     chunks.reverse()
//     while (chunks.length > 0) {
//         // yield await Promise.all((chunks.pop() as IpChunk).map(processIp))
//     }
// }
//
// async function main(task) {
//     const ipChunks = rangeToChunk(task.ipRange, os.cpus().length - 1);
//     let result = []
//
//   for await (const value of processChunks(ipChunks)) {
//       result = result.concat(value);
//   }
//
//   return result;
// }