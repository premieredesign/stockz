import {combineReducers} from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import inventoryReducers from "./inventoryReducers";
import modalReducer from "./modalReducer";


export default combineReducers({
    auth: authReducer,
    inventory: inventoryReducers,
    showmodal: modalReducer,
    errors: errorReducer
});
