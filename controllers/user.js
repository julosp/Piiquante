const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          let result = {
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzM4NCIsImtpZCI6IjRjMTdiZTdiMTcyOGQxMmY3ZGI4NzNhZWU5ODk0ODdmIn0.e30.qgxsrWzeuIhlYwGXyTrXKRwp0KxXf2_UgFc5jb0RWvCrmAYypiXZSP9Wam1xYtMF7IqRwmm6foX0xA-BlcCcof0b9Ujq8s3J-AfpEcdzQoHqdpYr5cOs3NyvDTsMumJp", {
              expiresIn: "24h",
            }),
          };
          console.log(result);

          return res.status(200).json(result);
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
