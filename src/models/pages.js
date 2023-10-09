import {
  getFiles,
  getFolders,
  getFile,
} from '../helpers/files';

const { WIKI_ROOT } = process.env; // config.wikiRoot

const getWikiFolders = path => getFolders(`${WIKI_ROOT}${path}`);
const getWikiPages = path => getFiles(`${WIKI_ROOT}${path}`)
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
  page: path => getFile(`${WIKI_ROOT}${path}`),
};
