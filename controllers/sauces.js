const sauces = require("../models/sauces"); //appel du model sauce
const fs = require("fs"); //appel de FS

exports.createSauces = (req, res) => { //creation de sauce
  const sauceObject = JSON.parse(req.body.sauce); //recupere les inputs de l'utilisateur pour crée la sauce
  delete sauceObject._id; //delete de l'id de la sauce
  delete sauceObject._userId; //delete de l'id de l'user
  const sauce = new sauces({ //crée une sauces via le model sauce
    ...sauceObject,
    userId: req.auth.userId, //recupere l'id de l'utilisateur
    imageUrl: `${req.protocol}://${req.get("host")}/images/${ //recupere l'image
      req.file.filename
    }`,
  });

  sauce
    .save()
    .then(() => res.status(200).json({ message: "Object enregistré !" }))
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.modifySauces = (req, res, next) => { //modification de sauce
  const sauceObject = req.file //recuperation de la sauce
    ? {
        ...JSON.parse(req.body.sauces), //recup des inputs
        imageUrl: `${req.protocol}://${req.get("host")}/images/${ //recup de l'image
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete sauceObject._userId;
  sauces
    .findOne({ id: req.params.id }) //find la sauce selon l'id
    .then((sauces) => {
      if (sauces.userId != req.auth.userId) { //si le l'user id de la sauce != a l'id de l'user 
        res.status(401).json({ message: "Non-autorisé" });
      } else {
        sauces
          .updateOne( //sinon on update la sauce selon les inputs 
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
          .then(() => res.status(200).json({ message: "Objet modifié" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauces = (req, res, next) => { //delete sauce
  sauces
    .findOne({ _id: req.params.id }) //find la sauce selon l'id 
    .then((sauces) => {
      if (sauces.userId != req.auth.userId) { //si le l'user id de la sauce != a l'id de l'user 
        res.status(401).json({ message: "Non-autorisé" }); // alors l'user ne peux pas delete la sauce
      } else {
        const filename = sauces.imageUrl.split("/image/")[1]; //sinon delete l'image et la sauce
        fs.unlink(`images/${filename}`, () => {
          sauces
            .deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Objet supprimé" }))
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauces = (req, res, next) => { //recupere une sauce
  sauces
    .findOne({ _id: req.params.id }) //find la sauce selon l'id
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

exports.getAllSauces = (req, res, next) => { //recupere toutes les sauces
  sauces
    .find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
