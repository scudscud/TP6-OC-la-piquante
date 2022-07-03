const express = require("express");
const app = express();
const mongoose = require("mongoose");
const sauceRouter = require("./route/sauces");
const userRouter = require("./route/users");
const path = require("path");
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://scud:5kJhE8iHJmmyMg8E@cluster0.vfl0poz.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use("/api/sauces", sauceRouter);
app.use("/api/auth", userRouter);
app.use("/images", express.static(path.join(__dirname, "images")));
module.exports = app;
