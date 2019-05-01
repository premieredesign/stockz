import {ADD_ITEM, GET_INVENTORY, REMOVE_ITEM} from "../actions/types";



const initialState = {
    items: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                items: action.payload
            };
        case REMOVE_ITEM:
            return {
                ...state,
                items: action.payload
            };
        case GET_INVENTORY:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
}
