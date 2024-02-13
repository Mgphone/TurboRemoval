const jwt = require("jsonwebtoken");
const secretKey = "mgphonechitsoneaf";

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    jwt.verify(token.split(" ")[1], secretKey, (err, user) => {
      if (err || !user) {
        console.error("JWT verification failed:", err);
        return res.status(403).json({ success: false, message: "Forbidden" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Error during JWT verification:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = authenticateToken;
