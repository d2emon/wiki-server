import pages from '../models/pages';
import urlPath from '../helpers/urlPath';

export default (req, res) => {
    const path = urlPath(req) + '.md';
    return pages.page(path)
        .then(page => res.send(page))
        .catch(error => res.json({ error }))
};
