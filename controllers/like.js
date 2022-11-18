const sauces = require("../models/sauces"); //appel le model sauces

exports.likeSauces = (req, res, next) => {
  //recup id de la sauces
  sauces
    .findOne({ _id: req.params.id })
    .then((obj) => {
      //switch case
      switch (req.body.like) {
        case 1:
          //like = +1
          if (  //si l'user n'est pas dans l'array userLiked mais que le like = 1 alors
            !obj.usersLiked.includes(req.body.userId) &&
            req.body.like === 1
          ) {
            sauces
              .updateOne( //on recup l'id de la sauce, on ajoute +1 au like et on push l'id de l'user a l'array userLiked
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
        case -1:
          //dislike = +1
          if ( //si l'user n'est pas dans l'array userDisliked mais que le dislike = 1 alors
            !obj.usersDisliked.includes(req.body.userId) &&
            req.body.like === -1
          ) {
            sauces
              .updateOne( //on recup l'id de la sauce, on ajoute +1 au dislike et on push l'id de l'user a l'array userDisliked
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
          //si l'id de l'user est dans l'array userLiked et que le like = 0
          if (obj.usersLiked.includes(req.body.userId) && req.body.like === 0) {
            sauces
              .updateOne( // on recupere l'id de la sauce, on retire 1 au like et on retire l'id de l'user a l'Array
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
          //si l'id de l'user est dans l'array userDisliked et que le dislike = 0
          if (
            obj.usersDisliked.includes(req.body.userId) &&
            req.body.like === 0
          ) {
            sauces
              .updateOne( // on recupere l'id de la sauce, on retire 1 au dislike et on retire l'id de l'user a l'Array
                { _id: req.params.id },
                {
                  $inc: { dislikes: -1 },
                  $pull: { usersDisliked: req.body.userId },
                }
              )
              .then(() => res.status(201).json({ message: "Dislike retiré" }))
              .catch((error) => res.status(400).json({ error }));
          }
      }
    })

    .catch((error) => res.status(404).json({ error }));
};
