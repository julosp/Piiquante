const passwordValidator = require("password-validator");

let passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(6)
  .is()
  .max(30)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .not()
  .spaces();

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res
      .status(400)
      .json({
        error: `Le mot de passe n'est pas assez fort ${passwordSchema.validate(
          "req.body.password",
          { list: true }
        )}`,
      });
  }
};
