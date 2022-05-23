const fs = require('fs');
const path = require('path');
const PATH = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(`${PATH}`);
readStream.on('data', (chunk) => console.log(chunk.toString()));