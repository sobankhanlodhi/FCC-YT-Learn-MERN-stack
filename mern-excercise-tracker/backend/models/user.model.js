const mongoose = require('mongoose');

const Schema = mongoose.Schema;     //all mongo schema starts the same like this

const userSchema = new Schema({
    username: {                 //its only have a single field name as username.
        //these are some validations for the username field
        type: String,
        required: true, //its a required field in our schema
        unique: true,   //its going to be unique
        trim: true,     //it'll trim the whitespace at the end if someone added it by mistake
        minlength: 3    //at least 3 characters are must to filled this field.
    },
},
{
    timestamps: true,   //then we have timestamp which know when the field was modified or created
});

const User = mongoose.model('User', userSchema);    //the name could be anything according to requirment

module.exports = User;       //then we export it


//The above code is same or similar to alot of mongoDB schema's