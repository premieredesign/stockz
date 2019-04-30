import {SET_LOGGEDIN_USER} from "../actions/types";
import isEmpty from '../validation/is-empty';


const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_LOGGEDIN_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        default:
            return state;
    }
}