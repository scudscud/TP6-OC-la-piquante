const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Sauce = require("./models/sauce");
mongoose
  .connect(
    "mongodb+srv://scud:5kJhE8iHJmmyMg8E@cluster0.aplke7d.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

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

app.get("/api/sauces/:id",(req,res,next)=>{
  Sauce.findOne({_id : req.params.id})

  .then((sauce)=>{
   res.status(201).json(sauce)})
   .catch((error)=>res.status(404).json({ message : "ererererer" + error}))
})

app.put("/api/sauces/:id",(req,res,next)=>{
  Sauce.updateOne({_id : req.params.id},{...req.body, _id : req.params.body})

  .then(()=>{
   res.status(200).json({message : "sauce modifier"})})
   .catch((error)=>res.status(400).json({ message : "ererererer" + error}))
})

app.delete("/api/sauces/:id",(req,res,next)=>{
Sauce.deleteOne({_id : req.params.id})
.then(()=>{res.status(200).json( {message : "sauce suprrimer"})})
.catch((error)=>res.status(400).json({ message : "ererererer" + error}))

})

app.get("/api/sauces", (req, res, next) => {
  Sauce.find()

    .then((sauces) => {
      res.status(201).json(sauces);
    })
    .catch((error) => res.status(404).json({ message: "ererererer" + error }));
  
});



app.post("/api/sauces", (req, res, next) => {
  delete req.body._id;
  const sauce = new Sauce({ ...req.body });

  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "post sucess" });
    })
    .catch((error) => res.status(404).json({ message: "ererererer" + error }));
});

module.exports = app;
