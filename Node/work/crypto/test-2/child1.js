const {createHmac} = require('crypto')

const secret = 'abcdefg';
const hash = createHmac('sha256', secret)

hash.on('readable', (data, string) => {
})

console.log(hash);
