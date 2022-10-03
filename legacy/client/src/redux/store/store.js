import {createStore,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import appReducer from '../reducers/index'

const middleware = [thunk];

let composeItems = [];
composeItems = process.env.NODE_ENV == 'development' ?
    composeItems = [applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()]
    :
    composeItems = [applyMiddleware(...middleware)];


const store = createStore(
    appReducer,
    {},
    compose(...composeItems)
);

store.subscribe(() => console.log(store.getState()));

export default store;