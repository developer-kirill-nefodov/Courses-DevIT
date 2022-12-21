const zlib = require('zlib')
const {
  createGzip,
  createBrotliCompress,
} = require('zlib');

const {pipeline} = require('stream');

const fs = require('fs');

function zip(source, des, three, level) {
  let zip, sour, dest;

  if (three === 'gzip' && level) {
    zip = createGzip({level});
  } else if (three === 'brotli' && level) {
    zip = createBrotliCompress({
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: level,
      }
    });
  } else return;

  sour = fs.createReadStream(source);
  dest = fs.createWriteStream(des);

  pipeline(sour, zip, dest).catch(console.log);
}

zip('html1.views', './newzip/1.views.gz', 'gzip', 9)
zip('html2.views', './newzip/2.views.gz', 'gzip', 9)
zip('html3.views', './newzip/3.views.gz', 'gzip', 9)

zip('html1.views', './newzip/html1.br', 'brotli', 11)
zip('html2.views', './newzip/html2.br', 'brotli', 11)
zip('html3.views', './newzip/html3.br', 'brotli', 11)


function compressedInfo(original, compressed) {
  console.log(`${original}: ${Math.round(fs.statSync(original).size / 1024)}kb.`)
  console.log(`${compressed}: ${Math.round(fs.statSync(compressed).size / 1024)}kb.`)
}

// compressedInfo('./html1.views', './newzip/1.views.gz')
// compressedInfo('./html2.views', './newzip/2.views.gz')
// compressedInfo('./html3.views', './newzip/3.views.gz')
