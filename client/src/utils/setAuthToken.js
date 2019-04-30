import axios from 'axios/index';

/*
    This will set or delete the Authorization Token in Headers.
 */
export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};
