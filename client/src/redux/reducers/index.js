import {combineReducers} from 'redux'
import itemReducer from './itemReducer'
import filterReducer from './filterReducer'
import pageStateReducer from './pageStateReducer'

export default combineReducers({
    items: itemReducer,
    filters: filterReducer,
    pageState: pageStateReducer
});