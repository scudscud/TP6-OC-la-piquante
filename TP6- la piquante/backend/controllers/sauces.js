const Sauce = require("../models/sauce");

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
  delete sauceObject._id;
  delete sauceObject._userId;

  const sauce = new Sauce({ ...sauceObject, userId: req.auth.userId, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` });
  sauce.save()
    .then(() => {
      res.status(201).json({ message: "ajout reussit" });
    })
    .catch((error) =>
      res.status(404).json({ message: "ajout invalide" + error })
    );
};

exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "sauce suprrimer" });
    })
    .catch((error) =>
      res.status(400).json({ message: "supression rater" + error })
    );
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
      res
        .status(404)
        .json({
          message: "cette sauce a connu une erreur c'estr la sauce" + error,
        })
    );
};
