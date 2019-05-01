import {GET_ERRORS, GET_INVENTORY} from "./types";
import axios from 'axios';


// Get Inventory
export const getStockzInventory = () => (dispatch) => {
    axios.get('/api/inventory/all')
        .then((items) => {
            dispatch(notifyInventoryReducer(items.data));
        })
        .catch((e) => dispatch({
            type: GET_ERRORS,
            payload: e.response.data
        }));
};

export const notifyInventoryReducer = (item) => {
    return {
        type: GET_INVENTORY,
        payload: item
    }
}
