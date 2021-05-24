const mongoose = require('mongoose');

const Schema = mongoose.Schema;     //all mongo schema starts the same like this

const exerciseSchema = new Schema({
    //this schema have 4 fields username, description, duration, date.
    username: {
        type: String,
        required: true, //its a required field in our schema
    },
    description: {
        type: String,
        required: true, //its a required field in our schema
    },
    duration: {
        type: Number,
        required: true, //its a required field in our schema
    },
    date: {
        type: Date,
        required: true, //its a required field in our schema
    },
},
{
    timestamps: true,   //then we have timestamp which know when the fields was modified or created
});

const Exercise = mongoose.model('Excercise', exerciseSchema);    //the name could be anything according to requirment

module.exports = Exercise;       //then we export it


//The above code is same or similar to alot of mongoDB schema's