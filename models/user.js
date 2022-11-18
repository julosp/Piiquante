const mongoose = require("mongoose"); //appel de mongoose
const uniqueValidator = require("mongoose-unique-validator"); //appel de mongoose unique validator 

const userSchema = mongoose.Schema({ //utilisation du .schema de mongoose pour crée schema utilisateur 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); //utilisation de uniqueValidator sur le schema pour verifier que l'utilisateur est unique

module.exports = mongoose.model("User", userSchema); //export du schema 
