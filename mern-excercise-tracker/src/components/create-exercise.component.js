//this file allow us to add exercises in the database
import React, { Component } from 'react';
import axios from 'axios';  //axios is used to connect front end with backend or pass frontend req to backend
import DatePicker from 'react-datepicker';  //we import here the datepicker component
import "react-datepicker/dist/react-datepicker.css";    //here is the datepicker styling

export default class CreateExercise extends Component {
  constructor(props) {  //in JS always called the super when defining the constructor in subclass
    super(props);   //all react component classes which have constructor should start with a super(props) call

    /* this below will make sure that which 'this' at which method/function are we refering or called and
    //         all 'this' is refering to the class CreateExercises*/
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //set initial state of the component by assigning an object to this.state
    //this.state is like creating variable in react always use this.state
    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  /*when people come to fill the form they will select the user from dropdown and that users list comes 
    from the mongodb database but below is a hardcode for 1 user only which is a test user*/
    /* this is the react lifecycle method that react automatically called at different methods
   its automatically called right before anything to be called to display on the page */
     // componentDidMount(){
     //     this.setState({
     //         users: ['test user'],
     //         username: 'test user'
     //     })
     // }
    
  //here the dropdown menu show all users from the database
  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
          //   we're checking at least there is one user in database
        if (response.data.length > 0) {
          this.setState({
            //   .map allow us to return something for each element in the array
            users: response.data.map(user => user.username),
            // [0] is for the first element in the array
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  /*lets say when someone type/change the name in the text box then this below method will set the 
    username value to whatever entered in that textbox*/
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';  //after saving to db we take our user to homepage
  }

  render() {
    return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}