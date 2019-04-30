import {applyMiddleware, createStore, compose} from "redux";
import thunk from 'redux-thunk';
import forAllReducers from './reducers';

const andinitializestate = {};
const middleware = [thunk];

// Create Redux Store
const store = createStore(
    forAllReducers,
    andinitializestate,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);


export default store;
