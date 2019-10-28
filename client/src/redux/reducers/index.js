import {combineReducers} from 'redux'
import itemReducer from './itemReducer'
import filterReducer from './filterReducer'

export default combineReducers({
    items: itemReducer,
    filters: filterReducer
});