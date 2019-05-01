import {SHOW_MODAL} from "./types";



// Login User
export const showModal = (isShowing) => {
    return {
        type: SHOW_MODAL,
        payload: isShowing
    }
};


