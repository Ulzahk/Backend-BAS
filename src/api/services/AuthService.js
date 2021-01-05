const jwt = require('jsonwebtoken');
const { secret } = require('../../config/env-variables');

class JWTAuthenticationService {
  constructor(){
    this.secret = secret;
  }

  JWTIssuer(payload, expiresIn){
    return jwt.sign(payload, this.secret, {expiresIn});
  }

  JWTVerify(token){
    return jwt.verify(token, this.secret);
  }
}

module.exports = JWTAuthenticationService;