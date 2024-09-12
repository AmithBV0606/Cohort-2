// Middleware for handling auth

const jwt = require("jsonwebtoken");
const secret = require("../config")

async function adminMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const words = token.split(" ");
  // Bearer vjfenv.dskjnvdwjk.kejfn => ["Bearer", "vjfenv.dskjnvdwjk.kejfn"]
  const jwtToken = words[1];
  
  try {
    const decodedValue = jwt.verify(jwtToken, secret)
    if (decodedValue.username) {
      next();
    } else {
      res.status(403).json({
          msg:"You are not authenticated"
      });
    }
  } catch (error) {
    res.json({
      msg: "incorrect inputs",
    })
  }
}

module.exports = adminMiddleware;