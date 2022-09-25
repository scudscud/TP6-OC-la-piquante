const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator');
const passwordValidator = require('password-validator')

// ----- schema mongoose fiche user------- \\
const schema = new passwordValidator()
schema.min(8)

const userSchema = mongoose.Schema({
 email: {type : String , required: true, unique: true},
 password: {type: String, minlength: 8,required: true, }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);   


