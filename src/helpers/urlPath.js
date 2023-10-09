export default req => req.params[0] || req.query.path || '';
