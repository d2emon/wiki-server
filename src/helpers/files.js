import fs from 'fs';

export const getFile = filename => new Promise((resolve, reject) => fs
    .readFile(filename, 'utf8', (err, text) => (err
        ? reject(err)
        : resolve(text)
    ))
);

export const getFiles = folder => new Promise((resolve, reject) => fs
    .readdir(folder, (err, files) => (err
        ? reject(err)
        : resolve(files)
        // files.filter(file => !file.startsWith('.'))
    ))
);

export const getFolders = folder => getFiles(folder)
    .then(files => files.filter((file) => {
        try {
            return fs.lstatSync(`${folder}/${file}`).isDirectory();
        } catch (error) {
            return false;
        }
    }));
