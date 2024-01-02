const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config"); 

// Middleware for handling auth
function adminMiddleware(req, res, next) {
 const token= req.headers.authorization;
 const words= token.split(" ");
 const jwttoken=words[1];

  const decodedvalue=jwt.verify(jwttoken,JWT_SECRET);
  if(decodedvalue.username){
    next();
  }
  else{
    res.status(404).json({
        msg:"not authorized admin"
    })
  }
}

module.exports = adminMiddleware;