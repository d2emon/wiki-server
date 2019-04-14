import fs from 'fs';

export const getFiles = folder => new Promise((resolve, reject) => (
    fs.readdir(folder, (err, files) => {
        // files.filter(file => !file.startsWith('.'))
        return err
            ? reject(err)
            : resolve(files);
    })
));

export const getFolders = folder => getFiles(folder)
    .then(files => files.filter((file) => {
        try {
            return fs.lstatSync(`${folder}/${file}`).isDirectory();
        } catch (error) {
            return false;
        }
    }));

export const getFile = filename => new Promise((resolve, reject) => {
  return fs.readFile(filename, 'utf8', (err, text) => (err
    ? reject(err)
    : resolve({
      // filename,
      text,
    })
  ))
});
