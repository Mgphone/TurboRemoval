const jwt = require("jsonwebtoken");
const secretKey = "mgphonechitsoneaf";
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorised" });
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err)
      return res.status(403).json({ success: false, message: "Forbidden" });
    req.user = user;
    next();
  });
};
module.exports = authenticateToken;
