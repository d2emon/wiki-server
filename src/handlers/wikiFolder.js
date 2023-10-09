import pagesModel from '../models/pages';
import urlPath from '../helpers/urlPath';
import { successResponse, errorResponse } from '../helpers/response';

export default (req, res) => {
  const path = urlPath(req);
  return Promise.all([
    pagesModel.pages(path),
    pagesModel.folders(path),
  ])
    .then(([pages, folders]) => {
      const result = [];
      folders.forEach(name => result.push({
        name,
        path: path ? `${path}/${name}` : name,
        folder: true,
      }));
      pages.forEach(name => result.push({
        name,
        path: path ? `${path}/${name}` : name,
        folder: false,
      }));
      return result;
    })
    .then(result => res.send(successResponse(result)))
    .catch(error => res.send(errorResponse(JSON.stringify(error))));
};
