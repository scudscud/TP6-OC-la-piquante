const mongoose = require("mongoose");
const Sauce = require("../models/sauce");
const fs = require("fs");
const sauce = require("../models/sauce");
// const  log  = require("console");
// const  json  = require("express");

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
    // usersDislikes: [],
    // userLikes: []
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

// exports.likeSauce = (req, res, next) => {
//   Sauce.findOne({
//     _id: req.params.id,
//   })
//     .then((sauce) => {
//       if (req.body.like === -1) {
//         (sauce.like = 0), sauce.dislike++;
//         sauce.insert(req.body.userId);
//         sauce.save();
//       }
//       if (req.body.like === 1) {
//         sauce.like++;
//         sauce.insert(req.body.userId);
//         sauce.save();
//       }
//       // if (req.body.like === 0) {
//       //   if (sauce.usersLiked.indexOf(req.body.userId) !== 1) {
//       //     sauce.like = 0;
//       //     sauce.usersLiked.splice(
//       //       sauce.usersDisliked.indexOf(req.body.userId),
//       //       1
//       //     );
//       //     sauce.save();
//       //   } else {
//       //     if (sauce.dislike > 0) {
//       //       sauce.dislike--;
//       //       sauce.usersDisliked.splice(
//       //         sauce.usersDisliked.indexOf(req.body.userId),
//       //         1
//       //       );
//       //       sauce.save();
//       //     } else {
//       //       sauce.dislike = 0;
//       //       sauce.usersDisliked.splice(
//       //         sauce.usersDisliked.indexOf(req.body.userId),
//       //         1
//       //       );
//       //       sauce.save();
//       //     }
//       //   }
//       //   sauce.save();
//       // }
//       res.status(200).json({ message: "like pris en compte" });
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });
// };

exports.likeUpdateSauce = (req, res, next) => {
  const user = req.body.userId;
  const userLike = req.body.like;
  const id = { _id: req.params.id };
  // const incLike = $inc : {}
  // console.log(user);
  // console.log(userLike);
  // console.log(id);

  Sauce.findOne(id)
  .then((click) => {
    // console.log(click);
    switch (userLike){ 
    case 1:{
  // if(!click.usersLiked.includes(user) && userLike === 1){
  console.log(click);
  console.log(id);
  // console.log(click.usersLiked);
  console.log(click.likes)
  // console.log(user);
  // console.log(userLike);
  // console.log(id);
  click.likes++,
 click.updateOne({usersLiked: user}
  )
 
  click.save();
}break;
 default : console.log("default");
}



// }

// }
}
)

.then(()=>res.status(201).json("ok"))  
.catch((error) => res.status(400).json({ error }));

};

// exports.likeUpdateSauce = (req, res, next) => {
//   const user = req.body.userId;
//   const userLike = req.body.like;
//   const id = { _id: req.params.id };

//   // console.log(user);
//   // console.log(userLike);
//   // console.log(id);
//   Sauce.findOne(id)
//     .then((click) => {
//       // console.log(click);
//       // console.log(typeof click.usersLiked);
//       switch (click) {
//         case !click.usersLiked.includes(user) && userLike === 1:
//           {
//             // console.log(click);
//             console.log(typeof click.usersLiked);
//             console.log(click.usersLiked);
//             click.updateOne({ usersLiked : "user", likes: 1 })
          
//               .then(() => res.status(201).json("ok"))
//               .catch((error) => res.status(400).json({ error }));
//             click.save();
//             res.status(200).json({ message: "like pris en compte" });
//           }
//           break;

//         // case test.like === 1:
//         //   {
//         //     console.log(test.like);
//         //     sauce.like++, sauce.push(test.like);
//         //     sauce.save();
//         //   }
//         //   break;

//         // case test.like === 0:
//         //   {
//         //     if (sauce.usersLiked.indexOf(test.userId) != 1) {
//         //       console.log(test.like);
//         //       sauce.likes--;
//         //       sauce.push(test.like);
//         //       sauce.save();
//         //     } else {
//         //       console.log(test.like);
//         //       sauce.dislikes--;
//         //       sauce.push(test.userId);
//         //       sauce.save();
//         //     }
//         //   }
//         //   break;
//       }
//       res.status(200).json({ message: "like pris en compte" });
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });
// };
