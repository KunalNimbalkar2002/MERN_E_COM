module.exports = (anyFunc) => (req, res, next) => {
  Promise.resolve(anyFunc(req, res, next)).catch(next);
};
