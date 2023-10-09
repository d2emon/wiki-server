import fs from 'fs';

const readFiles = folder => new Promise((resolve, reject) => (
  fs.readdir(folder, (err, files) => (err
    ? reject(err)
    : resolve(files)
  ))
));

const readFile = filename => new Promise((resolve, reject) => {
  fs.readFile(filename, 'utf8', (err, text) => (err
    ? reject(err)
    : resolve({
      text,
    })
  ));
});

/*
const getVisible = folder => readFiles(folder)
  .then(files => files.filter((file) => {
    try {
      return !file.startsWith('.');
    } catch (error) {
      return false;
    }
  }));
*/

export const getFolders = folder => readFiles(folder)
  .then(files => files.filter((file) => {
    try {
      return fs.lstatSync(`${folder}/${file}`).isDirectory();
    } catch (error) {
      return false;
    }
  }));

export const getFiles = readFiles;
export const getFile = readFile;
