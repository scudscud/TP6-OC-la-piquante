const Sauce = require("../models/sauce");
const fs = require("fs");

// ----- creer une sauce ------- \\
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "ajout reussit" });
    })
    .catch((error) =>
      res.status(404).json({ message: "ajout invalide" + error })
    );
};
// ----- supprimer une sauce ------- \\
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (req.auth.userId == sauce.userId) {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne(
            { _id: req.params.id },
            { ...req.body, _id: req.params.body }
          )
            .then(() => res.status(200).json({ message: "Objet supprimé !" }))
            .catch((error) => res.status(403).json({ error }));
        });
      } else {
        res.status(404).json("utilisateur non autorisé");
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
// ----- modifier une sauce ------- \\
exports.modififySauce = (req, res, next) => {
  if (req.body.userId == req.auth.userId) {
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      if (req.file !== undefined) {
        fs.unlink(`images/${filename}`, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("ok");
          }
        });
        const sauceObject = {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        };
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(res.status(200).json({ message: "sauce modifié" }))
          .catch((error) => res.status(404).json({ error }));
      } else {
        Sauce.updateOne(
          { _id: req.params.id },
          { ...req.body, _id: req.params.id }
        )
          .then(res.status(200).json({ message: "sauce modifié" }))
          .catch((error) => res.status(404).json({ error }));
      }
    });
  } else {
    res.status(404).json("utilisateur non autorisé");
  }
};

// ----- trouver plusieurs sauces ------- \\
exports.findSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(201).json(sauces);
    })
    .catch((error) =>
      res.status(404).json({ message: "sauces non trouver" + error })
    );
};
// ----- trouver une sauce ------- \\
exports.findOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      res.status(201).json(sauce);
    })
    .catch((error) =>
      res.status(404).json({
        message: "cette sauce a connu une erreur c'est la sauce" + error,
      })
    );
};
// ----- systeme like dislike une sauce ------- \\
exports.likeUpdateSauce = (req, res, next) => {
  const user = req.body.userId;
  const userLike = req.body.like;
  const id = { _id: req.params.id };

  Sauce.findOne(id)
    .then((click) => {
      
      switch (userLike) {
        // ----- like ------- \\
        case 1:
          {
            if( !click.usersLiked.includes(user)){
            click.likes++, click.usersLiked.push(user);
            click.save();
            console.log("like pris en compte");
            console.log(click);
          }
          }
          break;
        // ----- dislike ------- \\
        case -1:
          {
            if( !click.usersDisliked.includes(user)){
            click.dislikes++, click.usersDisliked.push(user);
            click.save();
            console.log("dislike pris en compte");
          }
        }
          break;
        // ----- retirer like dislike ------- \\
        case 0:
          {
            // ----- retrait du like ------- \\
            if (click.usersLiked.includes(user)) {
              click.likes--;
              click.usersLiked.pull(user);
              click.save();
              // console.log("like retirer");
            } else if ((click.usersDisliked.includes(user))) {
              // ----- retrait du dislike ------- \\
              click.dislikes--;
              click.usersDisliked.pull(user);
              click.save();
              // console.log("dislike retirer");
            }
          }
          break;
        default:
          console.log("il y a surement une erreur");
      }
    })
    .then(() => res.status(201).json("mise a jour des likes dislikes"))
    .catch((error) => res.status(400).json({ error }));
};
