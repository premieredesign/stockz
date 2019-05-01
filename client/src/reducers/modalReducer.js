import {SHOW_MODAL} from "../actions/types";



const initialState = {
    showmodal: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                showmodal: action.payload
            };
        default:
            return state;
    }
}
