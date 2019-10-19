import {SORT_BY,SEARCH_TEXT} from '../actions/types/types';

const defaultFilterReducer = {
    startDate: undefined,
    endDate: undefined,
    sortBy: '',
    searchText: ''
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
    }
});

export default filterReducer;