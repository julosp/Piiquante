const express = require("express"); //appel d'Express 
const router = express.Router(); //appel de la fonction router de Express pour gerer les routes 

const limitter = require("../middleware/limitter"); //appel du middleware Limitter
const passwordValidator = require("../middleware/password-validator"); //appel du middleware Password Validator

const userCtrl = require("../controllers/user"); //appel du controlleurs User

router.post("/signup", passwordValidator, userCtrl.signup); //route post pour le sign-up 
router.post("/login", limitter, userCtrl.login); //route post pour le login

module.exports = router; //exportation des routes
