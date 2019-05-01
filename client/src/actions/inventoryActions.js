import {ADD_ITEM, GET_ERRORS, GET_INVENTORY, REMOVE_ITEM} from "./types";
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


// Add Items
export const addStockzItem = (items) => (dispatch) => {
    axios.post('/api/inventory', items)
        .then((item) => {
            // Pass User data to payload object for reducer
            dispatch(addItemAndNotifyReducer(item.data));
        })
        .catch((e) => dispatch({
            type: GET_ERRORS,
            payload: e.response.data
        }))
};


// Remove items
export const removeStockzItem = (id) => (dispatch) => {
    axios.post(`/api/inventory/delete/${id}`)
        .then((item) => {
            // Pass User data to payload object for reducer
            dispatch(removeItemAndNotifyReducer(item.data));
        })
        .catch((e) => dispatch({
            type: GET_ERRORS,
            payload: e.response.data
        }))
};

export const notifyInventoryReducer = (item) => {
    return {
        type: GET_INVENTORY,
        payload: item
    }
}

export const addItemAndNotifyReducer = (item) => {
    return {
        type: ADD_ITEM,
        payload: item
    }
}

export const removeItemAndNotifyReducer = (item) => {
    return {
        type: REMOVE_ITEM,
        payload: item
    }
};
