import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from "react-router-dom";
import store from '../store';
import jwt_decode from 'jwt-decode';
import './App.css';

import {setAuthTokenHeader} from "../utils/setAuthTokenHeader";
import {logoutUser, setLoggedInUser} from "../actions/authActions";
import Dashboard from "../components/dashboard/Dashboard";
import NavBar from '../components/layout/Navbar';
import Landing from "../components/layout/Landing";
import Login from "../components/auth/Login";


// Set the localstorage token so that logged in users gets saved
if (localStorage.jwtToken) {
  setAuthTokenHeader(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setLoggedInUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}


function App() {
  return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar/>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/login" component={Login}/>
          </div>
        </Router>
      </Provider>
  );
}

export default App;
