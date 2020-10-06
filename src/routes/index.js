import express from 'express'
import wikiFolder from '../handlers/wikiFolder';
import wikiFile from '../handlers/wikiFile';

const router = express.Router();

/* GET folder contents. */
router.get('/folder/*', wikiFolder);

/* GET page contents. */
router.get('/page/*.md', wikiFile);

export default router;
