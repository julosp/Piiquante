const express = require("express"); //appel d'Express pour création Appli web
const mongoose = require("mongoose"); //appel de Mongoose pour base de donnée
const path = require("path"); //appel de Path pour gérer et transformer les chemins de fichier
const helmet = require("helmet"); //appel de Helmet pour securiser les headers HTTP
const mongoSanitize = require("express-mongo-sanitize"); //appel de Mongo Sanitize pour proteger des injections
const hpp = require("hpp"); //appel de hpp pour proteger les requetes HTTP
const xss = require("xss"); //appel de xss pour filter les inputs des utilisateurs
require("dotenv").config() //appel du fichier .env

const mongoKey = process.env.MONGO_API_KEY; //appel de la clé de connexion MongoDB
const saucesRoutes = require("./routes/sauces"); //appel de la route sauces
const userRoutes = require("./routes/user"); //appel de la route user

mongoose // connexion a la basse de donnée MongoDB
  .connect(
    mongoKey,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !")) 
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express(); //création de l'app via Express

app.use((req, res, next) => { //CORS -- permet au deux origines de communiquer entre elles
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use("/api/sauces", saucesRoutes); //appel des routes Sauces
app.use("/api/auth", userRoutes); //appel des routes User
app.use("/images", express.static(path.join(__dirname, "images"))); //appel de la routes du fichier images

app.use(helmet()); //utilisation de helmet
app.use(mongoSanitize()); //utilisation de mongo sanitize
app.use(hpp()); //utilisation de hpp
const html = xss('<script>alert("xss");</script>'); //utilisation de xss
console.log(html);

module.exports = app; //export de l'app
