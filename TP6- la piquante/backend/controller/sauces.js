const Sauce = require('../models/sauce')

exports.createSauce = (req, res, next) => {

    delete req.body._id;
    const sauce = new Sauce({ ...req.body });
    sauce.save()
    .then(() => {res.status(201).json({ message: "post sucess" });})
    .catch((error) =>res.status(404).json({ message: "aie une erreur" + error }));

};

exports.deleteSauce = (req,res,next)=>{
    Sauce.deleteOne({_id : req.params.id})
    .then(()=>{res.status(200).json( {message : "sauce suprrimer"})})
    .catch((error)=>res.status(400).json({ message : "aie une erreur" + error})) 
    }

exports.modififySauce = (req,res,next)=>{
    Sauce.updateOne({_id : req.params.id},{...req.body, _id : req.params.body})
    .then(()=>{
    res.status(200).json({message : "sauce modifier"})})
    .catch((error)=>res.status(400).json({ message : "aie une erreur" + error}))
}

exports.findSauce =  (req, res, next) => {
    Sauce.find()
.then((sauces) => {
    res.status(201).json(sauces); })
.catch((error) => res.status(404).json({ message: "aie une erreur" + error }));
}

exports.findOneSauce = (req,res,next)=>{
    Sauce.findOne({_id : req.params.id})
.then((sauce)=>{res.status(201).json(sauce)})
.catch((error)=>res.status(404).json({ message : "aie une erreur" + error}))
}