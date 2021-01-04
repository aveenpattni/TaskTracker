const secret = require('../config/secret');
const jwt = require('jsonwebtoken');

// This handler will check for, and validate, a token on the authorization header
module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    // If no token is sent in request
    if (!token) {
        res.status(401).json({
            message: 'Log in to access this page'
        })
    }
    // Validate the token
    jwt.verify(token, secret, (err, decoded) => {
      if(err){
        console.log(err);
      }
      // If it is NOT authentic, reject with 401
      if (!decoded) {
          return res.status(401).json({
            message: 'Invalid Token'
        })
      }
      // else if it IS authorized, store identity at req.user and call next
      req.user = decoded;
      next();
  })
}