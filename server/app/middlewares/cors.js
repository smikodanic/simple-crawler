module.exports = (req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Max-Age': '3600'
  });
  // console.log(res.get('Access-Control-Allow-Origin'));
  next();
};
