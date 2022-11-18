const bcrypt = require("bcrypt"); //appel de bcrypt
const jwt = require("jsonwebtoken"); //appel de jsonwebtoken
require("dotenv").config() //appel du dotenv

const User = require("../models/user"); //appel du model user
const keyToken = process.env.KEY //recuperation de la key 

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) //hash le password de l'utilisateur
    .then((hash) => {
      const user = new User({ //crée un nouveau user via le model User
        email: req.body.email,
        password: hash,
      });
      user
        .save()  //enregistre l'user
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) //recherche l'user via l'input email
    .then((user) => {
      if (!user) { //si l'user n'existe pas alors erreur
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password) //sinon compare input password avec user password
        .then((valid) => {
          if (!valid) { //si password invalide message d'erreur
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          let result = { //sinon connexion et creation d'un token utilisateur valable 24h
            userId: user._id,
            token: jwt.sign({ userId: user._id }, keyToken, {
              expiresIn: "24h",
            }),
          };
          return res.status(200).json(result);
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
