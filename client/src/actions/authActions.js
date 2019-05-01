import {GET_ERRORS, SET_LOGGEDIN_USER} from "./types";
import {setAuthTokenHeader} from "../utils/setAuthTokenHeader";
import jwt_decode from 'jwt-decode';
import axios from 'axios';


// Login User
export const loginUser = (userdata) => (dispatch) => {
    axios.post('/api/users/login', userdata)
        .then((res) => {
            // Destructure token from response data
            const {token} = res.data;
            // Set token in localstorage
            localStorage.setItem('jwtToken', token);
            // Set the Authorization header with token.
            setAuthTokenHeader(token);
            // Decode the user data in token
            const decoded = jwt_decode(token);
            // Pass User data to payload object for reducer
            dispatch(setLoggedInUser(decoded));
        })
        .catch((e) => dispatch({
            type: GET_ERRORS,
            payload: e.response.data
        }))
};

// Set Logged in User
export const setLoggedInUser = (decoded) => {
    return {
        type: SET_LOGGEDIN_USER,
        payload: decoded
    }
};

// Logout User
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthTokenHeader(false);
    dispatch(setLoggedInUser({}));
    window.location.href = '/';
};
