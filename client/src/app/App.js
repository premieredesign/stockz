import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from "react-router-dom";
import store from '../store';
import jwt_decode from 'jwt-decode';
import './App.css';


import {setAuthTokenHeader} from "../utils/setAuthTokenHeader";
import {logoutUser, setLoggedInUser} from "../actions/authActions";
import Dashboard from "../components/dashboard/Dashboard";



// Set the localstorage token so that logged in users gets saved
if (localStorage.jwtToken) {
  setAuthTokenHeader(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setLoggedInUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}


function App() {
  return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={Dashboard}/>
        </Router>
      </Provider>
  );
}

export default App;
