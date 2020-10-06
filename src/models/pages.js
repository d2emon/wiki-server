import {
  getFiles,
  getFolders,
  getFile,
} from '../helpers/files'

const WIKI_ROOT = process.env.WIKI_ROOT;

export default {
  folders: path => getFolders(`${WIKI_ROOT}${path}`),
  pages: path => getFiles(`${WIKI_ROOT}${path}`)
    .then(files => files.filter(filename => {
      const parts = filename.split('.')
      if (parts.length <= 1) return false
      const extension = parts[parts.length - 1]
      return extension === 'md'
    })),
  page: path => getFile(`${WIKI_ROOT}${path}`),
}
