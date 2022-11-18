const mongoose = require("mongoose"); //appel de Mongoose

const sauceSchema = mongoose.Schema({ //utilisation du .schema pour crée un schema type pour les sauces (id de l'utilisateur qui crée, nom, descriptions...)
  userId: {type: String, require: true},
  name: { type: String, require: true },
  manufacturer: { type: String, require: true },
  description: { type: String, require: true },
  mainPepper: { type: String, require: true },
  imageUrl: { type: String, require: true },
  heat: { type: Number, require: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

module.exports = mongoose.model("sauces", sauceSchema); //export du model
