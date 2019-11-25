import {combineReducers} from 'redux'
import itemReducer from './itemReducer'
import filterReducer from './filterReducer'
import commentReducer from './commentReducer'
import pageStateReducer from './pageStateReducer'

export default combineReducers({
    items: itemReducer,
    filters: filterReducer,
    comments: commentReducer,
    pageState: pageStateReducer
});