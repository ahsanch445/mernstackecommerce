const jwt = require("jsonwebtoken");
const Protected = (req, res, next) => {
  const headers = req.headers["authorization"];

  if (headers) {
    const token = headers;

    if (token) {
      jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
        if (decoded) {
          req.id = decoded.userId;
        } else if (err) {
          console.log("not eoufn");
        }
      });
    }
  }

  next();
};
module.exports = Protected;
