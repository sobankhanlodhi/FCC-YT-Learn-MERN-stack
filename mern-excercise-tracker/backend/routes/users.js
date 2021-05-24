const router = require('express').Router(); //we need express router thats what we're creating
let User = require('../models/user.model'); //this is the mongoose model which we created

/*this below is our first route means first IN point that handles incoming HTTP GET request on the / (slash)url path */
/*we have our route url which is https://localhost/5000  and then /users and if its a / at the end like 
https://localhost:5000/users/ and if its get request then the .find() will happen
*/ 
router.route('/').get((req,res)=>{
    //.find() is a mongoose method which give the list of all user from the mongodb atlas database
    User.find()
    .then(users => res.json(users)) //after finding the users means our promise is fulfilled then we return the users in json format
    .catch(err => res.status(400).json('Error: ' + err));   //& if our promise is not fulfilled means 
                                                        //there's an error we return the error with status 400
});

/*this below is our 2nd route or IN point which handles the http POST request */
/*if its a /add at the end in our url like 
https://localhost:5000/users/add and if its post request then the we'll handle the adding functionality
*/ 
router.route('/add').post((req,res)=>{
    const username = req.body.username;     //we assigned the req.body.username to username
    
    const newUser = new User({username});   //we create the new instance of User

    newUser.save()  //The .save() mongoose function is update the mongodb atlas db document with the new user
    .then(()=>res.json('User added!'))  //after saving then we return User added message in JSON
    .catch(()=>res.status(400).json('Error: ' + err)); //else throw the error with status 400
});

module.exports = router;        //here we export our router