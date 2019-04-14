import express from 'express'
import pages from '../models/pages'

const router = express.Router();

/* GET folder contents. */
router.get('/folder/:path?', (req, res) => {
  const path = req.params.path || req.query.path || '';
  return Promise.all([
      pages.pages(path),
      pages.folders(path),
  ])
      .then(([pages, folders]) => {
        return res.json({
          pages,
          folders,
        })
      })
      .catch(error => res.json({ error }))
});

/* GET page contents. */
router.get('/page/:path?', (req, res) => {
  const path = req.params.path || req.query.path || '';
  console.log(path, req.query)
  return pages.page(path)
      .then(page => res.json(page))
      .catch(error => res.json({ error }))
});

export default router;
