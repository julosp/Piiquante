const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzM4NCIsImtpZCI6IjRjMTdiZTdiMTcyOGQxMmY3ZGI4NzNhZWU5ODk0ODdmIn0.e30.qgxsrWzeuIhlYwGXyTrXKRwp0KxXf2_UgFc5jb0RWvCrmAYypiXZSP9Wam1xYtMF7IqRwmm6foX0xA-BlcCcof0b9Ujq8s3J-AfpEcdzQoHqdpYr5cOs3NyvDTsMumJp");
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
