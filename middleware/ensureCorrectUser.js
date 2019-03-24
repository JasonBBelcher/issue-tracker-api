const authServer = require('request');

var baseRequest = authServer.defaults({
  baseUrl: process.env.AUTH_SERVER
});

function loadOptsToken(token) {
  return (options = {
    headers: { 'Authorization': token },
    method: 'GET',
    uri: '/api/user/me'
  });
}

exports.ensureCorrectUser = function(req, res, next) {
  let token = req.header('Authorization');
  baseRequest(loadOptsToken(token), (err, request, response) => {
    const parsedResponse = JSON.parse(response);
    // if JWT is invalid stop here and return errors
    if (parsedResponse.err) {
      return next({
        status: parsedResponse.err.status,
        message: parsedResponse.err.message
      });
    }
    req.user = parsedResponse;
    next();
  });
};
