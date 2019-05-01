import {SHOW_MODAL} from "./types";




// Show Modal
export const showModal = (isShowing) => {
    return {
        type: SHOW_MODAL,
        payload: isShowing
    }
};


