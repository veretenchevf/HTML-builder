const fs = require('fs/promises');
const path = require('path');
const info = [];

(async function() {
  let arr = await fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true })
    .then(filenames => filenames.filter(file => !file.isDirectory()).map(dirent => dirent.name))
    .catch(err => {console.log(err);});
  await arr.forEach(function(file){
    info.push([path.parse(file).name, path.parse(file).ext]);
  });
  for(let file of info){
    let size = await fs.stat(path.join(__dirname, `secret-folder/${file.join('')}`));
    file.push(size.size);
  }
  console.log(info);
})();



