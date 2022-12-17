const mongoose = require("mongoose");
const mongodbError = require('mongoose-mongodb-errors')
  // ----- schema mongoose fiche sauce ------- \\
const sauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  imageUrl: { type: String, required: true },
  mainPepper: { type: String, required: true },
  usersLiked: { type: Array },
  usersDisliked: { type: Array },
  userId: { type: String, required: true },
});

sauceSchema.plugin(mongodbError)

module.exports = mongoose.model("Sauce", sauceSchema);
