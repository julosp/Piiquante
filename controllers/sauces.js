const sauces = require("../models/sauces");
const fs = require("fs");

exports.createSauces = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new sauces({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
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

exports.modifySauces = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauces),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`
      }
    : { ...req.body };

  delete sauceObject._userId;
  sauces
    .findOne({ id: req.params.id })
    .then((sauces) => {
      if (sauces.userId != req.auth.userId) {
        res.status(401).json({ message: "Non-autorisé" });
      } else {
        sauces
          .updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
          .then(() => res.status(200).json({ message: "Objet modifié" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauces = (req, res, next) => {
  sauces
    .findOne({ _id: req.params.id })
    .then((sauces) => {
      if (sauces.userId != req.auth.userId) {
        res.status(401).json({ message: "Non-autorisé" });
      } else {
        const filename = sauces.imageUrl.split("/image/")[1];
        fs.unlink(`images/${filename}`, () => {
          sauces.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Objet supprimé" }))
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauces = (req, res, next) => {
  sauces
    .findOne({ _id: req.params.id })
    .then((sauces) => {
      res.status(200).json(sauces)})
    .catch((error) => {
      res.status(404).json({ error })});
};

exports.getAllSauces = (req, res, next) => {
  sauces
    .find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
