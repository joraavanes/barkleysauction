import {combineReducers} from 'redux'
import itemReducer from './itemReducer'
import bidReducer from './bidReducer'
import userReducer from './userReducer'
import filterReducer from './filterReducer'
import commentReducer from './commentReducer'
import pageStateReducer from './pageStateReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'

export default combineReducers({
    items: itemReducer,
    users: userReducer,
    bids: bidReducer,
    filters: filterReducer,
    comments: commentReducer,
    pageState: pageStateReducer,
    auth: authReducer,
    error: errorReducer
});