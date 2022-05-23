const fs = require('fs');
const path = require('path');
const PATH = path.join(__dirname, '2do.txt');
const {stdin, stdout} = process;
const ws = fs.createWriteStream(PATH);
const readline = require('readline');
const rl = readline.createInterface(stdin, stdout);

stdout.write('hi there. what do u wanna to write down? i\'ll add it to my todo!\n');

rl.on('line', function(line){
  if(line === 'exit') return rl.close();
  ws.write(`${line}\n`);
});
rl.on('close', () => stdout.write('you\'ll come crawling back!'));

