import config from '../config';
import {
  getFiles,
  getFolders,
  getFile,
} from '../helpers/files';

const getWikiFolders = path => getFolders(`${config.wikiRoot}${path}`);
const getWikiPages = path => getFiles(`${config.wikiRoot}${path}`)
  .then(files => files.filter((filename) => {
    const parts = filename.split('.');
    if (parts.length <= 1) return false;
    const extension = parts[parts.length - 1];
    return extension === 'md';
  }));

export default {
  folders: getWikiFolders,
  pages: getWikiPages,
  folder: path => Promise
    .all([
      getWikiPages(path),
      getWikiFolders(path),
    ])
    .then(([
      pages,
      folders,
    ]) => ({
      pages,
      folders,
    })),
  page: path => getFile(`${config.wikiRoot}${path}`),
};
