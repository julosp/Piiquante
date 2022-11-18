const passwordValidator = require("password-validator"); //appel du password validator 

let passwordSchema = new passwordValidator(); //création d'un password validator 

passwordSchema //schema du password validator 
  .is()
  .min(6) //minimum 6 caractere
  .is()
  .max(30) //max 30 caractere
  .has()
  .uppercase() //une maj minimum
  .has()
  .lowercase() //une min max
  .has()
  .digits(2) //2 chiffres min
  .has()
  .not()
  .spaces(); //sans espace

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) { //si l'input de l'utilisateur match le schema 
    next();                                         //on passe au prochain middleware
  } else {
    return res
      .status(400)                                  //sinon message d'erreur
      .json({
        error: `Le mot de passe n'est pas assez fort ${passwordSchema.validate(
          "req.body.password",
          { list: true }
        )}`,
      });
  }
};
