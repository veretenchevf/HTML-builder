const fs = require('fs');
const path = require('path');
const {readdir, rm, access} = fs.promises;
let WRITE = '';
let arr = [];

async function CREATE(){
  await access(path.join(__dirname,'project-dist', 'bundle.css'), fs.constants.R_OK)
    .then(async () => await rm(path.join(__dirname,'project-dist', 'bundle.css') ,{ recursive: true, force: true }))
    .then(() => console.log('bundle.css updated'))
    .catch(()=> console.log('bundle.css created'))
    .finally(()=> {WRITE = fs.createWriteStream(`${path.join(__dirname,'project-dist', 'bundle.css')}`);
    });
}


async function findStyles(){
  await readdir(path.join(__dirname,'styles'))
    .then((files) => files.forEach(file => {if(path.parse(file).ext == '.css')arr.push(file);}));
}


(async function copyStyles(){
  await CREATE();
  await findStyles();
  for(let i = 0; i < arr.length; i++){
    let READ = fs.createReadStream(path.join(__dirname,'styles', `${arr[i]}`));
    READ.pipe(WRITE);
  }
})();