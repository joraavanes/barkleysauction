import {SORT_BY,SEARCH_TEXT,CLEAR_SEARCH_TEXT, DEFAULT_SEARCH_STATE, SEARCH_END} from '../actions/types/types';

const defaultFilterReducer = {
    startDate: undefined,
    endDate: undefined,
    sortBy: '',
    searchText: '',
    isSearchingEnd: false,
};

const filterReducer = ((state = defaultFilterReducer, action)=>{
    switch (action.type) {
        case SEARCH_TEXT:
            return {
                ...state,
                searchText: action.text
            };
        case SORT_BY:
            return{
                ...state,
                sortBy: action.sortType
            };
        case CLEAR_SEARCH_TEXT:
            return{
                ...state,
                searchText: ''
            }        
        case DEFAULT_SEARCH_STATE:
            return {
                ...state,
                isSearchingEnd: false
            }
        case SEARCH_END:
            return{
                ...state,
                isSearchingEnd: true
            }
        default:
            return state;
    }
});

export default filterReducer;