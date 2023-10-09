import express from 'express';
import pagesModel from '../models/pages';
import { errorResponse, successResponse } from '../helpers/response';

const router = express.Router();

/* GET folder contents. */
router.get('/folder/:path(*)?', (req, res) => {
  const path = req.params.path || req.query.path || '';
  return Promise.all([
    pagesModel.pages(path),
    pagesModel.folders(path),
  ])
    .then(([pages, folders]) => ({
      pages,
      folders,
    }))
    .then(successResponse(res))
    .catch(errorResponse(res));
});

/* GET page contents. */
router.get('/page/:path(*)?', (req, res) => {
  const path = req.params.path || req.query.path || '';
  return pagesModel.page(path)
    .then(successResponse(res))
    .catch(errorResponse(res));
});

export default router;
