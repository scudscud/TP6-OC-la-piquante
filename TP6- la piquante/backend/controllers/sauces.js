const Sauce = require("../models/sauce");
const fs = require("fs");

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
    usersDislikes: [],
    userLikes: [],
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

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};



exports.modififySauce = (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.body })
    .then(() => {
      res.status(200).json({ message: "sauce modifier" });
    })
    .catch((error) =>
      res.status(400).json({ message: "mise a jour rater" + error })
    );
};

exports.findSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(201).json(sauces);
    })
    .catch((error) =>
      res.status(404).json({ message: "sauces non trouver" + error })
    );
};

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

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      if (req.body.like === -1) {
        sauce.dislike++;
        sauce.usersDisliked.push(req.body.userId);
        sauce.save();
      }
      if (req.body.like === 1) {
        sauce.like++;
        sauce.usersLiked.push(req.body.userId);
        sauce.save();
      }
      if (req.body.like === 0) {
        if (sauce.usersLiked.indexOf(req.body.userId) !== 1) {
          sauce.like--;
          sauce.usersLiked.splice(
            sauce.usersDisliked.indexOf(req.body.userId),
            1
          );
        } else {
          sauce.dislike--;
          sauce.usersDisliked.splice(
            sauce.usersDisliked.indexOf(req.body.userId),
            1
          );
        }
        sauce.save();
      }
      res.status(200).json({ message: "like pris en compte" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
