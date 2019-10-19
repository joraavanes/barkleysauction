import {SORT_BY} from '../actions/types/types';

const defaultFilterReducer = {
    startDate: undefined,
    endDate: undefined,
    sortBy: '',
    searchText: ''
};

const filterReducer = ((state = defaultFilterReducer, action)=>{
    switch (action.type) {
        case SORT_BY:
            return{
                ...state,
                sortBy: action.sortType
            };
    }
});

export default filterReducer;