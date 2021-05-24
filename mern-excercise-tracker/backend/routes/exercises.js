const router = require('express').Router(); //we need express router thats what we're creating here
let Exercise = require('../models/exercise.model'); //this is the mongoose model which we created

/*this below is our first route means first IN point that handles incoming HTTP GET request on the / (slash)url path */
/*we have our route url which is https://localhost/5000  and then /exercises and if its a / at the end like 
https://localhost:5000/exercises/ and if its get request then the .find() will happen
*/ 
router.route('/').get((req,res)=>{
    //.find() is a mongoose method which give the list of all exercises from the mongodb atlas database
    Exercise.find()
    /* & afer finding all the excercise means our promise is fulfilled 
    then we take the exercises and return them in json format */
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));   //& if our promise is not fulfilled means 
                                                        //there's an error we return the error with status 400
});

/*this below is our 2nd route or IN point which handles the http POST request */
/*if its a /add at the end in our url like 
https://localhost:5000/exercises/add and if its post request then the we'll handle the adding functionality
*/ 
router.route('/add').post((req,res)=>{
    const username = req.body.username;             //we assigned the req.body.username to username
    const description = req.body.description;       //we assigned the req.body.description to description
    const duration = Number(req.body.duration);     //we assigned the req.body.duration to duration as a Number
    const date = Date.parse(req.body.date);         //we assigned the req.body.date to date as a Date
    
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });   //we create the new instance of Exercise

    newExercise.save()  //The .save() mongoose function is update the mongodb atlas db document with the new exercises
    .then(()=>res.json('Exercise added!'))  //after saving then we return Exercise added message in JSON
    .catch(()=>res.status(400).json('Error: ' + err)); //else throw the error with status 400
});

/*this below is our third route means 3rd IN point that handles incoming HTTP GET request*/
/*if its a /:id at the end in our url like
https://localhost:5000/exercises/:id (:id is object id created by mongodb automatically) and if you put some
id from the exercise collection(table) & if its get request then do the display functionality
*/ 
router.route('/:id').get((req,res)=>{
    //.findById() is a mongoose method which is used to find a single document(row) by its _id field
    Exercise.findById(req.params.id)
    /* & afer finding the id means our promise is fulfilled 
    then we take that exercise and return it in json format */
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));   //& if our promise is not fulfilled means 
                                                        //there's an error we return the error with status 400
});

/*this below is our fourth route means 4th IN point that handles incoming HTTP delete request*/
/*if its a /:id at the end in our url like
https://localhost:5000/exercises/:id and if its delete request then do the deletion functionality
*/ 
router.route('/:id').delete((req,res)=>{
    /*.findByIdAndDelete() is a mongoose method which is used to find a matching document, removes it, 
    and passing the found document (if any) to the callback */
    Exercise.findByIdAndDelete(req.params.id)
    /* & afer finding and deleting the id means our promise is fulfilled 
    then we show the message Exercise deleted in json format */
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));   //& if our promise is not fulfilled means 
                                                        //there's an error we return the error with status 400
});

/*this below is our fifth route means 5th IN point that handles incoming HTTP post request*/
/*if its a /update/:id at the end in our url like
https://localhost:5000/exercises/update/:id and if its post request then do the updation functionality
*/ 
router.route('/update/:id').post((req,res)=>{
    //.findById() is a mongoose method which is used to find a single document(row) by its _id field
    Exercise.findById(req.params.id)
    /* & afer finding the id means our promise is fulfilled 
    then we take that exercise object and update its properties */
    .then(exercise => {
        exercise.username = req.body.username;  //req.body.username is what you want to update and its assigned to previous one
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(()=>res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));   //& if our promise is not fulfilled means 
                                                        //there's an error we return the error with status 400
});

module.exports = router;        //here we export our router