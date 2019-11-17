import {createStore,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import appReducer from '../reducers/index'

const middleware = [thunk];

const store = createStore(
    appReducer,
    {},
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

store.subscribe(() => console.log(store.getState()));

export default store;