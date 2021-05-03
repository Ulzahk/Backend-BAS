const jwt = require('jsonwebtoken');
const { secret } = require('../../config/env-variables');

class JWTAuthenticationService {
  constructor(){
    this.secret = secret;
  }

  JWTIssuer(payload, expiresIn){
    try {
      return jwt.sign(payload, this.secret, {expiresIn});
    } catch (err) {
      console.log(err)
    }
  }

  JWTVerify(token){
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = JWTAuthenticationService;