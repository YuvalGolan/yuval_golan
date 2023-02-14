function errorHandlerMiddleware(err, req, res, next) {
  if (!err.status) {
    //other error
    return res.status(500).send({ error: 'internal server error' });
  }
  return res.status(err.status).send({ message: err.message });
}

module.exports = { errorHandlerMiddleware };