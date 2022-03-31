const pool = require('../sql/connection')
const jwt = require('jsonwebtoken');
const jwtSecret = "secret123";

const checkJwt = (req, res, next) => {
  console.log("processing JWT authentication check");

  console.log('req.headers', req.headers)

  let token;
  if(req.headers.authorization){
    let bearer = req.headers.authorization.split(" ");
    token = bearer[1]
    console.log('token', token)
  } else {
    token = null;
    console.log('token', token)
  }
  if(!token){
    res.status(401).send("Unauthorized!!!");
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if(err){
      console.log("Did not verify jwt" + err);
      return res.status(401).send("Unauthorized request, please log in first")
    }

    console.log("decoded information about who made the request", decoded);
    //req - had info about the post that you were to create
    //by decoding the token we know who made the request
    req.email = decoded.email;
    req.id = decoded.id
    next()
  })
}

module.exports = { checkJwt }

