const {
  scrypt,
  randomFill,
  createCipheriv
} = require('crypto')


const algorithm = 'aes-192-cbc';

process.on('message', (m) => {
  console.log(m)
  scrypt(m.toString(), 'salt', 24, (err, key) => {
    if (err) throw err;
    randomFill(new Uint8Array(16), (err, iv) => {
      if (err) throw err;

      const cipher = createCipheriv(algorithm, key, iv);

      let encrypted = '';
      cipher.setEncoding('hex');

      cipher.on('data', (chunk) => encrypted += chunk);
      cipher.on('end', () => console.log(encrypted));

      cipher.write('some clear text data');
      cipher.end();
    });
  });


})



