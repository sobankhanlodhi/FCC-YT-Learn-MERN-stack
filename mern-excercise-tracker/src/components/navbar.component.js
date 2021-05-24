import React, { Component } from 'react';

//since we're using react router we import it with Link which allow us to link with different routes
import { Link } from 'react-router-dom';

//all component starts like this
export default class Navbar extends Component {

    render() {   //all component have to render something
        return (    //all the below code is from bootstrap navbar documemntation edited to work for our app purposes
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                {/* Instead of anchor tag we use the Link tag from react router which works same as anchor */}
                <Link to="/" className="navbar-brand">ExcerTracker</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Exercises</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Exercise Log</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Create User</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }


}