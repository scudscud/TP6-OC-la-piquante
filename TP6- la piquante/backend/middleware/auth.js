const jwt = require("jsonwebtoken");
 // ----- gestion authentification----- \\
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodeToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (err) {
    res.status(403).json({ err });
  }
};



