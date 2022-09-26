const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator');
const passwordValidator = require('password-validator')

// ----- schema mongoose fiche user------- \\


const userSchema = mongoose.Schema({
 email: {type : String , required: true, unique: true},
 password: {type: String,required: true}
});
const passSchema = new passwordValidator()
passSchema.
is().min(8)
.has().uppercase(1) 
.has().lowercase(1)    
.has().digits(1)  
passSchema.validate(userSchema)

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);   


