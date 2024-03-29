const passwordValidator = require('password-validator')

const passSchema = new passwordValidator()
passSchema.
is().min(8)
.has().uppercase(1) 
.has().lowercase(1)    
.has().digits(1)  


module.exports = (req,res,next) => {
    if(passSchema.validate(req.body.password)){
        next()
    }else{
     res.status(400).json("le mot de passe doit contenir 8 carateres, 1 chiffre , 1 majuscule et 1 miniscule")
    }
}
