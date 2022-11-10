const sauces = require("../models/sauces");

exports.likeSauces = (req, res, next) => {
  //recup id sauce
  sauces
    .findOne({ _id: req.params.id })
    .then((obj) => {
      //switch case
      switch (req.body.like) {
        case 1:
          //like = +1
          if (
            !obj.usersLiked.includes(req.body.userId) &&
            req.body.like === 1
          ) {
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
          break;
        //like = 0 (retirer like)
        /**/
        case -1:
          //like = -1 (dislike = +1)
          if (
            !obj.usersDisliked.includes(req.body.userId) &&
            req.body.like === -1
          ) {
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
          break;

        case 0:
          //retirer like
          if (obj.usersLiked.includes(req.body.userId) && req.body.like === 0) {
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
          //retirer dislike
          if (
            obj.usersDisliked.includes(req.body.userId) &&
            req.body.like === 0
          ) {
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
        //like = 0 (retirer dislike)
        /* */
      }
    })

    .catch((error) => res.status(404).json({ error }));
};
