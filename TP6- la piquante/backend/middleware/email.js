
module.exports = (req,res,next) => {
    console.log(req.body.email);
    const email = req.body.email
    const validEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
    if(validEmail.test(email)){
        next()
    }else{
     res.status(400).json("entrer un email valide ex : toto@gmail.fr")
    }
}


