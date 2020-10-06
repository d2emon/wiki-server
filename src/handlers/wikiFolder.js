import pages from '../models/pages';
import urlPath from '../helpers/urlPath';

export default (req, res) => {
    const path = urlPath(req);
    return Promise.all([
        pages.pages(path),
        pages.folders(path),
    ])
        .then(([pages, folders]) => res.json({
            pages,
            folders,
        }))
        .catch(error => res.json({ error }))

};
