//this is the file where we're going to put our code that will display on the page

//import logo from './logo.svg';
//import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    /* React Router helps us to map specific urls to different components that will load on the page */      
    <Router>
      <div className="container">
        <Navbar />
        <br/>      
        <Route path="/" exact component = {ExerciseList} /> {/* the path set to url path means if you go to route url at the slash (/) at the end this will load the ExerciseList Component*/}
        <Route path="/edit/:id" exact component = {EditExercise} />
        <Route path="/create" exact component = {CreateExercise} />
        <Route path="/user" exact component = {CreateUser} />
      </div>
    </Router>
    
  );
}

export default App;

//anything we change in here then the jsx will return and loaded in index.js then the index.html will display that