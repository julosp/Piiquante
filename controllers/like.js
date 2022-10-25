const sauces = require("../models/sauces");

exports.likeSauces = (req, res, next) => {
  //recup id sauce
  sauces
    .findOne({ _id: req.params.id })
    .then((obj) => {
      //like = +1
      if (!obj.userLiked.includes(req.body.userId) && req.body.like === 1) {
        sauces
          .updateOne(
            { _id: req.params.id },
            {
              $inc: { likes: 1 },
              $push: { usersLiked: req.body.userId },
            }
          )
          .then(() => res.status(201).json({ message: "Sauce liké" }))
          .catch((error) => res.status(400).json({ error }));
      }
      //like = 0 (retirer like)
      if (obj.userLiked.includes(req.body.userId) && req.body.like === 0) {
        sauces
          .updateOne(
            { _id: req.params.id },
            {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId },
            }
          )
          .then(() => res.status(201).json({ message: "Like retiré" }))
          .catch((error) => res.status(400).json({ error }));
      }
      //like = -1 (dislike = +1)
      if (!obj.userDisliked.includes(req.body.userId) && req.body.like === -1) {
        sauces
          .updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: 1 },
              $push: { usersDisliked: req.body.userId },
            }
          )
          .then(() => res.status(201).json({ message: "Dislike ajouté" }))
          .catch((error) => res.status(400).json({ error }));
      }
      //like = 0 (retirer dislike)
      if (obj.userDisliked.includes(req.body.userId) && req.body.like === 0) {
        sauces
          .updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
            }
          )
          .then(() => res.status(201).json({ message: "Dislike retiré" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })

    .catch((error) => res.status(404).json({ error }));
};
