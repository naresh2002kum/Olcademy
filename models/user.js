
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')



const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type:String,
        enum:['M','F','T']
    },
    rtime:{
        type:Date,
        default: Date.now()
    },
    dob:{
        type:Date,
    }
});
 UserSchema.plugin(passportLocalMongoose);

 module.exports = mongoose.model("User", UserSchema);