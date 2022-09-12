const express = require("express");
const app = express();
const mongoose = require("mongoose");
const sauceRouter = require("./route/sauces");
const userRouter = require("./route/users");
const path = require("path");
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json());
 // ----- connect mongoose ------ \\
mongoose
  .connect(
    process.env.CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
 // ----- app generale ------ \\
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
 // ----- app sauces------ \\
app.use("/api/sauces", sauceRouter);
 // ----- app authentification----- \\
app.use("/api/auth", userRouter);
 // ----- app images------ \\
app.use("/images", express.static(path.join(__dirname, "images")));
module.exports = app;
