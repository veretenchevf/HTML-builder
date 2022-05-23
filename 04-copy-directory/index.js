const fs = require('fs');
const { mkdir, copyFile, readdir, rm, access} = fs.promises;
const path = require('path');

async function copyDir(){
  try{
    await access(path.resolve(__dirname, 'files-copy'), fs.constants.R_OK);
    await rm(path.resolve(__dirname, 'files-copy') ,{ recursive: true, force: true });
    await mkdir('04-copy-directory/files-copy')
      .then(()=> console.log('files-copy directory was updated'))
      .catch((error) => console.log(error));
  }catch{await mkdir('04-copy-directory/files-copy')
    .then(()=> console.log('files-copy directory created'))
    .catch((error) => console.log(error));}
  await readdir(path.join(__dirname, 'files'))
    .then((files) => files.forEach(file => copyFile(path.join(__dirname, 'files', `${file}`), (path.join(__dirname, 'files-copy', `${file}`)))))
    .catch(err => console.log(err));
}
copyDir();
