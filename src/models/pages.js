import config from '../config'
import {
  getFiles,
  getFolders,
  getFile,
} from '../helpers/files'

export default {
  folders: path => getFolders(`${config.wikiRoot}${path}`),
  pages: path => getFiles(`${config.wikiRoot}${path}`)
    .then(files => files.filter(filename => {
      const parts = filename.split('.')
      if (parts.length <= 1) return false
      const extension = parts[parts.length - 1]
      return extension === 'md'
    })),
  page: path => getFile(`${config.wikiRoot}${path}`),
}
