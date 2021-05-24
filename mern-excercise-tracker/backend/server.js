const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');   //mongoose is help us to connect with our mongodb database

require('dotenv').config();     //this will configure so we can have our environment variable in .env file

//Below two helps in creating Express Server on PORT 5000
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());            //this is our cors middleware
app.use(express.json());    //this allow us to parse JSON bcz our server is sending and receiving JSON

const uri = process.env.ATLAS_URI;      //its our database uri, we get this from mongoDB atlas dashboard
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});      /*we pass uri thats where our db
                stored and the flags are used for mongoDB updates and functions*/

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB Database connection established successfully");
});     /* Once the connection is open Log the message & we're connected to the database
            Now we can put data in database and read something from database*/

//here we're importing our routes files/api end points
const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

/*app.use to use these files means when someone goes to our route url and put /exercises at the end it will
load everthing in the exerciseRouter and if /users at the end then load everthing that are in usersRouter*/
app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);


//below is the line which starts the server, it starts listening on a specific port
app.listen(port, ()=>{
    console.log(`Server is running on Port: ${port}`);
});