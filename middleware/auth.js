const jwt = require("jsonwebtoken"); //appel de Jsonwebtoken
require("dotenv").config(); //appel du .env
const keyToken = process.env.KEY; //recuperation de la key

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //recuperation du token de l'utilisateur
    const decodedToken = jwt.verify(token, keyToken); //verifie le token et la key
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId, //recupere l'id utilisateur
    };
    next(); //passe au prochain middleware
  } catch (error) {
    res.status(401).json({ error });
  }
};
