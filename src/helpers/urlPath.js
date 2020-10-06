export default (req) => {
    return req.params[0] || req.query.path || '';
};
